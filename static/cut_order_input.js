//function ที่กดเพื่อเปลี่ยนหน้า
let currentPage = 1
function changePage(changePage) {
    window.scrollTo(0,0)
    if (changePage === 'forward') {
        id('page'+currentPage).style.display = "none"
        id('page'+(currentPage+1)).style.display = "flex"
        currentPage += 1
    }
    else if (changePage === 'back') {
        id('page'+currentPage).style.display = "none"
        id('page'+(currentPage-1)).style.display = "flex"
        currentPage -= 1
    }
}

//function ที่กดแล้วเลือกว่าจะเข้ามารับกระจกที่ตัดตอนไหน
function timeOption() {
    let timeSelect = id('timeSelect').selectedIndex
    if (timeSelect == 1) {
        id('orderTime').innerHTML = ``
    }
    else if (timeSelect == 2) {
        id('orderTime').innerHTML = "<input type='time' class='time' name='pickupTime' id='pickupTime'>"
    }
}