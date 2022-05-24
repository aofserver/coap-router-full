//ref : https://github.com/MagicCube/coap-router
const URL = require("url");

const METHODS = ["all", "get", "observe", "post", "put", "delete"];

module.exports = function router()
{
    const handlers = [];
    const router = function(req, res, next) {
        const url = URL.parse(req.url);
        var path = url.path;
        var querystring = path.includes('?') ? path.split("?")[1] : undefined
        path = path.includes('?') ? path.split("?")[0] : path
        let method = req.method.toLowerCase();
        if (method === "get" && req.headers['Observe'] === 0)
        {
            method = "observe";
        }

        const handlersCloned = handlers.slice(0);
        function findAndExecuteNextHandler()
        {
            let result = undefined;
            while (result === undefined)
            {
                const handler = handlersCloned.shift();
                if (handler)
                {
                    if (handler.method === "all" || handler.method === method)
                    {
                        let handlerPath = null;
                        if (router.basePath)
                        {
                            if (handler.path === "/")
                            {
                                handlerPath = router.basePath;
                            }
                            else
                            {
                                handlerPath = router.basePath + handler.path;
                            }
                        }
                        else
                        {
                            handlerPath = handler.path;
                        }

                        if (handler.callback.isRouter)
                        {
                            if (path.startsWith(handlerPath))
                            {
                                req.handled = true;
                                result = handler;
                                break;
                            }
                        }
                        ///////// Logic get parameter and querystring in url /////////
                        var query = {}
                        var params = {}
                        if(querystring){
                            var urlParam = new URLSearchParams(querystring);
                            query = Object.fromEntries(urlParam);
                        }
                        if(path !== handlerPath && handlerPath.includes(":") && path.split("/").length == handlerPath.split("/").length){
                            list_handlerPath = handlerPath.split("/")
                            list_path = path.split("?")[0].split("/")
                            params = {}
                            var pathNew = ''
                            for(var i=0;i<list_handlerPath.length;i++){
                                if(list_handlerPath[i].includes(':')){
                                    params[list_handlerPath[i].split(":")[1]] = list_path[i]
                                }
                                if(list_path[i]){
                                    if(!list_handlerPath[i].includes(':')){
                                        pathNew = pathNew + "/" + list_path[i]
                                    }
                                    else{
                                        pathNew = pathNew + "/" + list_handlerPath[i]
                                    }
                                }
                            }                 
                            path = pathNew
                        }
                        ///////////////////////////////////////////////////////////////
                        if (path === handlerPath)
                        {
                            res.locals = {}
                            req.handled = true;
                            req.params = params
                            req.query = query;
                            result = handler;
                            break;
                        }
                    }
                }
                else
                {
                    break;
                }
            }

            if (result)
            {
                result.callback(req, res, findAndExecuteNextHandler);
            }
            else
            {
                if (typeof(next) === "function")
                {
                    next();
                }
                else
                {
                    if (!req.handled)
                    {
                        // 404 - Not found
                        res.code = 404;
                        res.end();
                    }
                }
            }
        }

        findAndExecuteNextHandler();
    };
    router.isRouter = true;



    router.method = function(method, path, callback)
    {
        method = method.toLowerCase();

        if (METHODS.indexOf(method) === -1)
        {
            throw new Error(`In CoAP protocol, method only accepts GET, POST, PUT and DELETE.`);
        }
        if (typeof(callback) !== "function")
        {
            throw new Error("Callback must be a function.");
        }
        if (path !== "" && !path.startsWith("/"))
        {
            throw new Error("Path must starts with '/'.");
        }

        handlers.push({
            method,
            path,
            callback
        });
        
        return this;
    };
    METHODS.forEach(method => {
        router[method] = function(path, callback)
        {
            return router.method(method, path, callback);
        };
    });

    
    router.use = function(path, subRouter)
    {
        subRouter.basePath = (router.basePath ? router.basePath : "") + path;
        this.all(path, subRouter);
    };
    return router;
};
