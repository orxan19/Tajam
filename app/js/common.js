function bindReady(handler)
{
    var called=false;
    function ready()
    {
        if(called)
        {
            return;
        }
        
        called = true;
        handler();
    }
    
    if (document.addEventListener)
    {
        document.addEventListener("DOMContentLoaded", function()
        {
            ready();
        },false);
    }
    else if (document.attachEvent)
    {
        if (document.documentElement.doScroll && window==window.top)
        {
            function tryScroll()
            {
                if (called || !document.body) return;
                
                try
                {
                    document.documentElement.doScroll("left");
                    ready();
                }
                catch(e)
                {
                    setTimeout(tryScroll,0);
                }
            }
            
            tryScroll();
        }
        
        document.attachEvent("onreadystatechange",function()
        {
            if(document.readyState==="complete") ready();
        });
    }
    
    if (window.addEventListener) window.addEventListener('load',ready,false);
    else if (window.attachEvent) window.attachEvent('onload',ready);
}


readyList=[];

/**
 * Функция onReady - добавляет handler в
 *
 */
function onReady(handler)
{ 
    if(!readyList.length)
    {
        bindReady(function()
        {
            for(var i=0;i<readyList.length;i++)
            {
                readyList[i]();
            }
        })
    }
    
    readyList.push(handler)
}

onReady(function(){
	const switchers = document.querySelectorAll(".switchers__item");
	const title = document.querySelector("#titles");
	const titles = title.querySelectorAll(".title");
	
	
	switchers.forEach(switcher => switcher.addEventListener("click", toggleItem));
	function toggleItem(e){
		const target = e.target;
		const attr = target.dataset.item;

		titles.forEach(function(item){
			item.classList.add("active");
			
		});

		titles[attr].classList.remove("active");
		switchers.forEach(function(i){
			i.classList.remove("active");
		})
		target.classList.add("active");
	}
});

