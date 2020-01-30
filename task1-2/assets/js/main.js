$(function() {
    let data;
    const localData = localStorage.getItem('myCardList');
    if (!localData) {
        data = [ //4 dene column var
            [],
            [],
            [],
            [],
        ];
    } else {
        data = JSON.parse(localData).data;
        var boardIndex = 0
        for (let board of data) {
            for (let card of board) {
                if (card) createNewNote(card.title, card.text, card.date, false).insertBefore($($('.board-column')[boardIndex]).find('.add-task')) //3 cu columndan sonra yaz
            }
            boardIndex++
        }
    }



    const add_button = `
         <div class="add-task">
            <a class="open-add-task" href="">
                <span class="icon-add icon-sm"> <i class="fa fa-plus" aria-hidden="true"></i></span>
                <span class="js-add-a-card">Add card</span>
            </a>
        </div>`
    $(document.body).on('click', '.add-task', function(e) {
        // var $index = $(this).closest('.board-column').index();
        // $(this).parent('.board-column').find('.tasks-container').append(' <div class="task" id="1")>This is something i want to do </div>')
        createNewNote().insertBefore($(this))
        e.preventDefault();
    });

    function drag() {
        let draggedCard = $('.card').draggable({
            helper: "clone"
        });
        $('.card').on('dragstart', (e) => { //yeri deyiserse
            var colIndexPrev = $(e.target).parents('.board-column').index();
            var cardIndexPrev = $(e.target).index() - 1 /* .parents('.card') */ ;
            // console.log(colIndexPrev, cardIndexPrev);

            $('.board-column').droppable({
                drop: function(event, ui) {
                    var droppableCard = ui.draggable.insertBefore($(event.target).find('.add-task'))

                    let boardIndex = event.target.id, //newColIndex
                        cardIndex = droppableCard.index() - 1 //newCardIndex

                    const title = droppableCard.find('#title').text();
                    const text = droppableCard.find('#text').text();
                    const date = droppableCard.find('#date').text()

                    data[colIndexPrev][cardIndexPrev] = null; //goturduyumuzu hemin column-dan sil 
                    var newBoard = data[colIndexPrev].filter(function(el) {
                        return el != null; //deleting null values
                    });
                    data[colIndexPrev] = newBoard


                    data[boardIndex][cardIndex] = { //yeni cola elave ele
                        title,
                        text,
                        date
                    };
                    updateStorage();

                }
            });
        })

    }

    function createNewNote(title = '', text = '', date = '', isStatic = true) {
        drag();
        const forEditing = `
        
            <div class="form-container">
                <input type="text" placeholder="Title" class="form-title" value="${title}">
            </div>
            <div class="form-container">
                <textarea placeholder="Text" name="" id="" cols="30" rows="10" class="form-text">${text}</textarea>
            </div>
            <div class="form-container">
                <input type="date" id="start" class="form-date" value="${date}">
            </div>
         
        `;

        const staticPart = `  
        <div class="task">
            <div class="note">
                Date: <h4 class="note-heading" id="date">${date}</h4></div>
            <div class="note">
                Title: <h4 class="note-heading" id="title"> ${title}</h4></div>
            <div class="note">
               Text:  <h4 class="note-heading" id="text">${text}</h4></div>

        </div> 
        `;

        const template = isStatic ? `
       <div class="card tasks-container" data-status="static" >
            <div class="card-body">
           ${forEditing } 
                <div class="button-container">
                <button type="button" data-edit class="btn btn-save ">Save</button>
                    <button type="button" data-delete class="btn btn-remove">Remove</button>
                    <div/>
            </div>
        </div>
        ` : ` <div class="card tasks-container">${staticPart}
                 <div class="button-container">
                    <button type="button" data-edit class="btn btn-edit" style="display:none">Edit</button>
                    <button type="button" data-delete class="btn btn-remove" style="display:none">Remove</button>
            <div/>
    </div></div>`


        return $(template)
    }


    const task_container = $('.tasks-container'); //if i enter the board
    // const card = $('.card'); //if i enter the card

    task_container.on({
        mouseenter: function() {
            // console.log("heeeeeeee");
            $(this).find('.btn-edit').show();
            $(this).find('.btn-remove').show();
        },
        mouseleave: function() {
            $(this).find('.btn-edit').hide();
            $(this).find('.btn-remove').hide();
        }
    });


    function cardStatus(card) {
        const isStatic = card.attr('data-status') == 'static';
        if (!isStatic) {
            // console.log('object');
            const title = card.find('#title').text();
            // console.log(title);
            const text = card.find('#text').text();
            const date = card.find('#date').text()
            card.html(createNewNote(title, text, date, true).html());
            card.attr('data-status', 'static');
        } else {
            const title = card.find('.form-title').val();
            const text = card.find('.form-text').val();
            const date = card.find('.form-date').val();
            if ((title && title !== ' ') && (text && text !== ' ') && (date && date !== ' ')) {
                // console.log(text);
                const boardIndex = card.parents('.board-column').index(); //finding index of board columns
                const cardIndex = card.index() - 1; //finding editing card index 
                //i write minus because of 1 card index is equal to 1 but i want to start from 0 as array
                // console.log(boardIndex, cardIndex);
                data[boardIndex][cardIndex] = { //if i edit the last column and 2 card it will be    
                    //  data[4-1][2]   (1 arraylerde 0 dan baxladigi ucun)
                    title,
                    text,
                    date
                };
                updateStorage(); //edit edenden sonra ve ya 

                card.html(createNewNote(title, text, date, false).html());
                card.attr('data-status', 'edit');
            } else {
                alert('Please fill all the inputs')
            }
        }
        // location.reload();
    }
    $('.board-column').on('click', '[data-edit]', function(e) {
        const card = $(this).parents('.card');
        cardStatus(card);
    });


    $(document.body).on('click', '[data-delete]', function(e) {
            const boardIndex = $(this).parents('.card').parent().index();
            const cardIndex = $(this).parents('.card').index() - 1;
            // console.log(boardIndex, cardIndex);
            data[boardIndex][cardIndex] = null //data[3][1]=null

            //imagine i have 1irem ,2item, 3,item in my data[3]  
            // and  if i remove  2item and it is data[3][1] is going to be null after,
            //remove 3item it doesnt removing because of its index is data[3][1] for this time 
            //so that we should delete null for our reaching best
            //btw i did this logic for 1 hour
            var newBoard = data[boardIndex].filter(function(el) {
                return el != null;
            });
            data[boardIndex] = newBoard


            $(this).parent().parent().remove();
            updateStorage();

        })
        /* 
            $(document).ready(function() {
                $('.card').attr('data-status', 'static');
            }); */
    function updateStorage() {
        localStorage.setItem('myCardList', JSON.stringify({ data }));
    }
})