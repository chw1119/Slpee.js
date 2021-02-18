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

    //test

    function __slpee (){

    }

    return __slpee;

})()

