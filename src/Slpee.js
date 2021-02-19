const Slpee = (function(){
    const STATUS = Object.freeze({
        NORMAL : 0x0,
        ENDED  : 0x1
    });


    const Chrono = (function(){
        function __chrono(mil,time,option){
            this.init(mil,time,option)
        }

        __chrono.prototype.init = function(mil,time,option){
            this.start = mil || Date.now();
            this.end   = this.start + time;
            this.time               = time;
            this.progress              = 0;
            this.status    = STATUS.NORMAL;
            this.startFunc       = option.start;
            this.intervalFunc = option.interval;
            this.endedFunc       = option.ended;

            this.startFunc.call(this);
        }

        __chrono.prototype.getStart = function(){
            return this.start;
        }

        __chrono.prototype.getEnded = function(){
            return this.end;
        }

        __chrono.prototype.getStatus = function(){
            return this.status;
        }

        __chrono.prototype.getProgress = function(){
            this.checkProgress();
            return this.progress;
        }

        __chrono.prototype.checkProgress = function(){
            setProgress(this,(this.time - (this.end - Date.now())) / this.time * 100);
        }

        __chrono.prototype.rewind = function(mil,time,option){
            this.init(mil,time,option);
        }

        let setProgress = function(ctx,prg){
            if(ctx.status == STATUS.ENDED)return;
            this.intervalFunc.call(ctx);
            ctx.progress = prg;
            if(prg >= 100){
                ctx.status = STATUS.ENDED;
                this.endedFunc.call(ctx);
                ctx.progress = 100;
            }
        }

        return __chrono;
    })();
    /* chrono-time master */

    const Handler = (function(){
        function __handler(count){
            this.works = [];
            this.workLimitation = count || __handler.static.COUNT.STANDARD_WORK_LIMITATION;
        }

        __handler.prototype.handleProcess = function(){
            for(let works of works){
                works.run();
            }
        }


        __handler.static = Object.freeze({
            COUNT:{
                STANDARD_WORK_LIMITATION : 0xff
            }
        })

        return __handler;
    })()

    const Animation = (function(){
        //works

        function __animation(obj){
            this.type = obj.type || __animation.static.TYPE.STANDARD;
            this.target                         = obj.target || null;
            this.webdom             = new WebDocuments(obj.elements);

            this.duration = obj.duration || __animation.static.VALUE.STANDARD_DURATION;
            this.delay             = delay || __animation.static.VALUE.STANDARD_DELAYS;
            
            this.chronos        = new Chrono(Date.now()    + this.delay,this.duration);
        }

        __animation.static = Object.freeze({
            TYPE:{
                STANDARD:"MOVE"
            },
            VALUE : {
                STANDARD_DURATION : 1000,
                STANDARD_DELAYS   : 1000
            }
        })

        return __animation;

    })()

    const WebDocuments = (function(){
        function __webDom(elements){
            switch(elements.constaructor){
                case String:
                    this.elemants = document.querySelectorAll(elements);
                    this.type     = "WEB"
                break;

                case HTMLDivElement:
                case HTMLSpanElement:
                case HTMLBodyElement:
                case HTMLImageElement:
                case HTMLCanvasElement:
                case HTMLButtonElement:
                    this.elemants = [elements];
                    this.type     = "WEB"
                break;

                case Object:
                    this.elemants = [elements];
                    this.type     = "OBJECT"
                    
                break;

                case Array:
                    this.elemants = elements;
                    this.type     = "UNKNOWN"
                break;

                default:
                    break;
                
            }
        }

        return __webDom;
    })()

    function __slpee (limits){
        this.handler = new Handler(limits);
    }

    return __slpee;

})()

