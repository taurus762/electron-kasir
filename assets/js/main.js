let doc_id = $('body').attr('id')

//total page
total_page = (total_row_displayed, searchVal = "") => {
    switch(doc_id) {
        case 'product-data':
            totalPrdPage(total_row_displayed, searchVal);
            break;
        case 'buyer-data':
            totalBuyerPage(total_row_displayed, searchVal)
            break
    }
}

load_data = (page_number, total_row_displayed) => {
    switch(doc_id) {
        case 'product-data' :
            loadProduct(page_number, total_row_displayed);
            break;
    }
}
let page_number = $('#page_number').val()
let total_row_displayed = $('#row_per_page').val()
let searchVal = $('#search-data').val()
load_data(page_number, total_row_displayed)

load_data()

deleteRecord = (id) => {
    let doc_id = $('body').atter('id')
    let table
    switch (doc_id) {
        case 'product-data':
            table='product'
            break;
    }
    let sql = `delete from $(table) whereb d = ${id}`
    db.run(sql, err => {
        if(err) {
            console.log(err)
        } else{
            load_data()
        }
    })
}

deleteAllRecords = () => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'product-data':
            table = 'products';
            break;
    }
    let sql = `delete from ${table}`
    db.run(sql, err =>{
        if(err) {
            console.log(err)
        } else{
            load_data()
        }
    })
} 

deleteMultipleRecords = (ids) => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'product-data':
            table = 'products';
            break;
    }
    let sql = `delete from ${table} where id IN(${ids})`
    db.run(sql, err =>{
        if(err) {
            console.log(err)
        } else{
            load_data()
        }
    })
} 

//checkbox checked
$('tbody#data').on('click','tr', function() {
    let data_id = $(this).attr('data-id')
    let checkBox = $('input[type="checkbox"]#'+data_id)
    checkBox.prop('checked',!checkBox.prop("checked"))
    $(this).toggleClass('blocked')
})

editRecord = (id) => {
    let doc_id = $('body').attr('id')
    switch (doc_id) {
        case 'product-data':
            editPrdData(id)
            break;
    }
}

alertSuccess = (msg) => {
    let div = `<div class="alert alert-success">${msg}</div>`
    $('#alert').html(div)
    clearAlert = () => {
        $('#alert').html("")
    }
    setTimeout(clearAlert, 4000)
}

numberFormat = (number) => {
    let numFormat = new Intl.NumberFormat('de-DE').format(number)
    return numFormat
}