let id = document.getElementById.bind(document)

document.getElementById("pageTwoForward").addEventListener("click", () => {
  document.getElementById("final-order-container").innerHTML = "";
  document.getElementById("customerInfoTable").innerHTML ="";
  getCustomerInfo()
  document.getElementById("customerInfoTable").innerHTML = `
        <tr>
            <td class="customer-info-heading">ชื่อ</td>
            <td style="width: 50%">${customerName}</td>
        </tr>
        <tr>
            <td class="customer-info-heading">เบอร์โทร</td>
            <td style="width: 50%">${customerPhone}</td>
        </tr>
        <tr>
            <td class="customer-info-heading">Line ID</td>
            <td style="width: 50%">${customerLineID}</td>
        </tr>
        <tr>
            <td class="customer-info-heading">วันที่เข้ามารับ</td>
            <td style="width: 50%">${pickupDate}</td>
        </tr>
        <tr>
            <td class="customer-info-heading">เวลาที่เข้ามารับ</td>
            <td style="width: 50%">${pickupTime}</td>
        </tr>
    `;
    checkOrderQuantity()
    let nodelist = document.querySelectorAll(".nodelist");
    nodelist.forEach((element) => {
        let arrNodelist = element.textContent.split(" มิล ");
        document.getElementById("final-order-container").innerHTML += `
                <tr>
                    <td>${arrNodelist[0]}</td>
                    <td>${arrNodelist[1]}</td>
                    <td>${arrNodelist[2].replace(" แผ่น", "")}</td>
                </tr>
            `;
  });
  createForm(nodelist)
});

function createForm(list) {
    id('submitForm').innerHTML = ""
    let userform = `
        <input type="text" name="name" value="${customerName}"><br>
        <input type="text" name="phone" value="${customerPhone}"><br>
        <input type="text" name="line" value="${customerLineID}"><br>
        <input type="text" name="pickupDate" value="${pickupDate}"><br>
        <input type="text" name="pickupTime" value="${pickupTime}"><br>
    `
    id('submitForm').innerHTML = userform

    list.forEach((element) => {
        let arrNodelist = element.textContent.split(" มิล ");
        id("submitForm").innerHTML += `
            <input type="text" name="glass" value="${arrNodelist[0]}"><br>
            <input type="text" name="size" value="${arrNodelist[1]}"><br>
            <input type="text" name="quantity" value="${arrNodelist[2]}"><br>
        `;
    })

    id('submitForm').innerHTML += `
        <button class="submit-button" action="submit">ส่งรายการตัด</button>
    `
}

//รับข้อมูลลูกค้า
let customerName = ""
let customerPhone = ""
let customerLineID = ""
let pickupDate = ""
let pickupTime = ""
function getCustomerInfo() {
    customerName = id("name").value
    customerPhone = id("phone").value
    customerLineID = id("line").value
    pickupDate = id("pickupDate").value
    if (id("timeSelect").value == 'inform') {
        pickupTime = 'ตัดเสร็จแล้วให้โทรบอก'
    } 
    else if (id("timeSelect").value == 'chosen') {
        pickupTime = id('pickupTime').value
    }
}

//เพิ่มและลดจำนวนกระจกที่ต้องการสั่ง
let quantity = 1
let number = id('quantity')
number.innerHTML = quantity
function plusMinus(operator) {
    if (operator === 'plus') {
        quantity += 1
        number.innerHTML = quantity
    } else if (operator === 'minus') {
        if (quantity == 1) {
            return
        } else {
            quantity -= 1
            number.innerHTML = quantity
        }
    }
}

//รับข้อมูลกระจกที่ลูกค้ากรอก
orderNumber = 1
orderQuantity = 0
function addGlassOrder() {
    if  (id('glassType').value == '' || 
        id('thickness').value == '' || 
        id('width').value == '' || 
        id('height').value == '') {
        Swal.fire({
            title : "กรุณาใส่ข้อมูลกระจกให้ครบ",
            icon : 'warning',
            confirmButtonText : "ปิด",
            confirmButtonColor : "#10446c"
        })
        return
    }
    glassType = id('glassType').value
    thickness = id('thickness').value
    width = id('width').value
    height = id('height').value
    sheetQuan = quantity
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'เพิ่มรายการกระจกแล้ว',
        showConfirmButton: false,
        timer: 1250
      })

    //set ให้ตัวเลขจำนวนและตัวแปร quantity กลับไปเป็น 1 
    quantity = 1
    number.innerHTML = quantity
    addToList()

    orderQuantity += 1

    checkOrderQuantity()
    orderNumber += 1

    id('width').value = ''
    id('height').value = ''
    id('width').focus()
}

//นับว่ามีรายการที่สั่งกี่รายการ
function checkOrderQuantity() {
    if (orderQuantity == 0) {
        id('orderContainer').style.display = "none"
        id('orderSummary').style.display = "none"
    } else  {
        id('orderContainer').style.display = "flex"
        id('orderSummary').style.display = "block"
    }
}

//เพิ่ม text ที่สั่งเข้ามา
function addToList() {
    id('listOrder').innerHTML +=`
    <div class="listOrder-Container" id="orderNumber${orderNumber}">
        <div>
            <p class="form-text center nodelist" style="margin-top: 0px; font-weight: 300">${glassType} ${thickness}<br> ${width}x${height} มิล<br> ${sheetQuan} แผ่น</p>
        </div>
        <div class="listOrder-button-container">
            <div>
                <button class="delete-order-button" onclick="deleteOrder(${orderNumber})">X</button>
            </div>
        </div>
    </div>
    <div id="orderLine${orderNumber}">
        <hr>
    </div>
    `
}

//ลบรายการ
function deleteOrder(number) {
    Swal.fire({
        title: 'ยืนยันการลบ',
        text: "ต้องการลบรายการใช่หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then((result) => {
        if (result.isConfirmed) {
            id('orderNumber'+number).innerHTML = ''
            id('orderLine'+number).innerHTML = ''
            orderQuantity -= 1
        }
        checkOrderQuantity()
      })
}

function confirmSubmit() {

    if (customerName === "" || customerPhone === "" || customerLineID === "" || pickupDate === "" || pickupTime === "") {
        Swal.fire({
            title : "กรุณากรอกข้อมูลผู้สั่งตัดให้ครบ",
            icon : 'warning',
            confirmButtonText : "ปิด",
            confirmButtonColor : "#10446c"
        })
        return
    } 

    if (orderQuantity == 0) {
        Swal.fire({
            title : "กรุณาเพิ่มรายการสั่งตัดกระจก",
            icon : 'warning',
            confirmButtonText : "ปิด",
            confirmButtonColor : "#10446c"
        })
        return
    }

    Swal.fire({
        title: 'ยืนยันการส่งรายการ',
        text: "กรุณาตรวจสอบข้อมูลผู้สั่งตัด และขนาดตัดให้ถูกต้องก่อนส่ง",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'กลับ'
      }).then((result) => {
        if (result.isConfirmed) {
            id('submitForm').submit()
        }
      })
}

function checkIfBlank() {
    if (customerName === "" || customerPhone === "" || customerLineID === "" || pickupDate === "" || pickupTime === "") {
        Swal.fire({
            title : "กรุณากรอกข้อมูลผู้สั่งตัดให้ครบ",
            icon : 'warning',
            confirmButtonText : "ปิด",
            confirmButtonColor : "#10446c"
        })
        return
    } 
    if (orderQuantity == 0) {
        Swal.fire({
            title : "กรุณาเพิ่มรายการสั่งตัดกระจก",
            icon : 'warning',
            confirmButtonText : "ปิด",
            confirmButtonColor : "#10446c"
        })
        return
    }
}