(function () 
{
    let windowHeigth = window.innerHeight;
    console.log(windowHeigth)
    let count = 0;
    let btRow = document.getElementById('addRow');
    let addedContent = document.getElementById('added-content');
    let divText = document.getElementById('content');
    let divImage = document.getElementById('imageContent');
    let select = document.getElementById('selectElement');
    let textCase = document.getElementById('textCase');
    let backgroundInput = document.getElementById('backgroundColor');
    let elWidth = document.getElementById('elementWidth');
    let reg = document.getElementById('register');
    let imageReg = document.getElementById('imageRegister');
    let message = document.getElementById('message');
	let main = document.getElementById('main');
	let imageCase = document.getElementById('imageCase');
	let imageWidth = document.getElementById('imageWidth');
    main.style.minHeight = windowHeigth - 350 + 'px';
	var reader = new FileReader();
	let spanList = [];
	let imgChoice;

    reg.onclick = function () 
    {
        if(textCase.value == ''|| backgroundInput.value == '' || elWidth.value == '')
        {
            showMessage();
            return;
		}
        let span = document.createElement('span');
        let createdText = document.createElement('p');
        span.style.backgroundColor = backgroundInput.value;
        span.style.width = elWidth.value + 'px';
        span.style.height = '200px';
        span.style.display = 'inline-block';
        span.style.alignItems = 'center';
        span.style.verticalAlign = 'top';
        createdText.innerHTML = textCase.value;
        span.appendChild(createdText);
        spanList.push(span);
        cleanField();
	}

	imageCase.onchange = function(event) 
	{
		var input = event.target;
		var reader = new FileReader();
		reader.onload = function()
		{
			var dataURL = reader.result;
			imgChoice = document.createElement('img');
			imgChoice.src = dataURL;
			imgChoice.style.display = 'none';
			
		};
		reader.readAsDataURL(input.files[0]);
	  };

	  imageReg.onclick = ()=>
	  {
		count += 1;
		let span = document.createElement('span');
		span.appendChild(imgChoice);
		spanList.push(span);
		imgChoice.id = '_' + count;
		imgChoice.style.width = imageWidth.value + 'px';
		imgChoice.style.height = '200px';
		cleanField();
	  }

    btRow.onclick = ()=>
    {
        if(spanList.length === 0)
        {
            return;
        }
        count += 1;
        let divCreate = document.createElement('div');
		let btRemove = document.createElement('button');
		if(imgChoice != undefined)imgChoice.style.display = 'block';
        btRemove.innerHTML = 'x';
        btRemove.classList.add('remove');
        spanList.forEach((element)=>
        {
            divCreate.appendChild(element);
        });
        divCreate.id = '_' + count;
        divCreate.style.display = 'flex';
        divCreate.style.alignItems = 'center';
        divCreate.style.width = '100%';
        divCreate.style.maxWidth = '980px';
        divCreate.style.margin = '0 auto';
        divCreate.appendChild(btRemove);
        addedContent.appendChild(divCreate);
        spanList = [];
        btRemove.onclick = ()=>
        {
            document.getElementById(divCreate.id).remove()
        }
    }

    select.onchange = function()
    {
        let selected = this.value;

        if(selected == 'text')
        {
            if(screen.width <= 700)
            {
                divText.style.display = 'block';
                divImage.style.display = 'none';
            }
            else
            {
                divText.style.display = 'flex';
                divImage.style.display = 'none';
            }
        }
        if(selected == 'image')
        {
            if(screen.width <= 700)
            {
                divText.style.display = 'none';
                divImage.style.display = 'block';
            }
            else
            {
                divText.style.display = 'none';
                divImage.style.display = 'flex';
            }
        }

    }

    function cleanField() 
    {
        textCase.value = '';
        backgroundInput.value = '';
		elWidth.value = '';
		imageCase.value = '';
		imageWidth.value = '';
    }

    function showMessage()
    {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);

    }


})();
