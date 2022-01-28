/**
 * @package todo.js
 */

$(() => {
 console.info(`Hello world from todo`);
 $.get("php/listItems.php", (r) => {
  let response = r.trim();
  console.log(response);

  var button, checkbox, label, td, tr;

  let tbl = document.getElementById("priorityOne");
  let obj = JSON.parse(response);

  obj.forEach((item) => {
   tr = document.createElement("tr");

   /**
    *! The checkbox
    */
   td = document.createElement("td");
   checkbox = document.createElement("input");
   checkbox.note = `${item.project}`;
   checkbox.setAttribute("onchange", "checkboxChange(this)");
   checkbox.type = "checkbox";
   checkbox.value = `${item.rid}`;
   if (item.done === "1") {
    checkbox.checked = true;
   } else {
    checkbox.checked = false;
   }
   td.appendChild(checkbox);
   tr.appendChild(td);

   /**
    *! A spacer
    */
   td = document.createElement("td");
   td.innerHTML = "&nbsp;";
   tr.appendChild(td);

   /**
    *! The label
    */
   td = document.createElement("td");
   label = document.createElement("label");
   label.innerText = item.note;
   if (item.done === "1") {
    label.setAttribute("class", "strikeThrough");
   } else {
    label.setAttribute("class", "");
   }
   td.appendChild(label);
   tr.appendChild(td);

   /**
    *! A spacer
    */
   td = document.createElement("td");
   td.innerHTML = "&nbsp;";
   tr.appendChild(td);

   /**
    *! An edit button
    */
   td = document.createElement("td");
   button = document.createElement("button");
   button.innerText = "Edit";
   button.setAttribute("class", "button-2");
   button.setAttribute("onclick", `editThis(this)`);
   td.appendChild(button);
   tr.appendChild(td);

   /**
    *! A spacer
    */
   td = document.createElement("td");
   td.innerHTML = "&nbsp;";
   tr.appendChild(td);

   /**
    *! A delete button
    */
   td = document.createElement("td");
   button = document.createElement("button");
   button.innerText = "Delete";
   button.setAttribute("class", "button-2");
   button.setAttribute("onclick", `deleteThis('${item.rid}')`);
   td.appendChild(button);
   tr.appendChild(td);

   tbl.appendChild(tr);
  });
 });
});

function addItem() {
 console.info("Adding item");
 var button, br, input, label, td, textarea, tr;
 let tbl = document.getElementById("priorityOne");

 tr = document.createElement("tr");

 /**
  *! The label and input for project
  */
 td = document.createElement("td");
 label = document.createElement("label");
 label.innerText = "Project";
 td.appendChild(label);
 br = document.createElement("br");
 td.appendChild(br);
 input = document.createElement("input");
 input.id = `project`;
 input.size = "5";
 input.type = "text";
 input.value = ``;
 td.appendChild(input);
 tr.appendChild(td);

 /**
  *! A spacer
  */
 td = document.createElement("td");
 td.innerHTML = "&nbsp;";
 tr.appendChild(td);

 /**
  *! The label and input for note
  */
 td = document.createElement("td");
 label = document.createElement("label");
 label.innerText = "Note";
 td.appendChild(label);
 br = document.createElement("br");
 td.appendChild(br);
 textarea = document.createElement("textarea");
 textarea.cols = "50";
 textarea.rows = "1";
 textarea.id = `note`;
 textarea.size = "50";
 td.appendChild(textarea);
 tr.appendChild(td);

 /**
  *! A spacer
  */
 td = document.createElement("td");
 td.innerHTML = "&nbsp;";
 tr.appendChild(td);

 /**
  *! The label and input for priority
  */
 td = document.createElement("td");
 label = document.createElement("label");
 label.innerText = "priority";
 td.appendChild(label);
 br = document.createElement("br");
 td.appendChild(br);
 input = document.createElement("input");
 input.id = `priority`;
 input.size = "5";
 input.type = "number";
 input.value = ``;
 td.appendChild(input);
 tr.appendChild(td);

 /**
  *! A spacer
  */
 td = document.createElement("td");
 td.innerHTML = "&nbsp;";
 tr.appendChild(td);

 /**
  *! An save button
  */
 td = document.createElement("td");
 button = document.createElement("button");
 button.innerText = "Save";
 button.setAttribute("class", "button-2");
 button.setAttribute("onclick", `saveThis()`);
 td.appendChild(button);
 tr.appendChild(td);

 tbl.insertBefore(tr, tbl.childNodes[2]);

 document.getElementById("project").focus();
}

function checkboxChange(elem) {
 console.log(elem);
 let id = elem.value;
 let thisParent = elem.parentNode.parentNode;
 let thisLabel = thisParent.querySelector("label");
 // thisLabel.forEach(() => {
 console.log(thisLabel.innerHTML);
 if (elem.checked === true) {
  thisLabel.setAttribute("class", "strikeThrough");
  let postData = {
   id: id,
   done: true,
  };
  $.post("php/taskDone.php", JSON.stringify(postData), (r) => {
   let response = r.trim();
   console.info(response);
  });
 } else {
  thisLabel.setAttribute("class", "");
  let postData = {
   id: id,
   done: false,
  };
  $.post("php/taskDone.php", JSON.stringify(postData), (r) => {
   let response = r.trim();
   console.info(response);
  });
 }
}

function editThis(elem) {
 console.clear();
 console.info(elem);
 var br, button, buttons, input, label, textarea, td;
 let checkbox = elem.parentNode.parentNode.querySelector(
  "input[type=checkbox]"
 );

 let id = checkbox.value;

 console.log(elem);
 console.log(id);
 let postData = {
  rid: id,
 };

 console.log(postData);
 $.post("php/listItems.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.log(response);
  let item = JSON.parse(response);
  console.log(`item.note=> ${item[0].note}`);
  let thisParent = elem.parentNode.parentNode;
  buttons = thisParent.querySelectorAll("button");
  let thisLabel = thisParent.querySelector("label");
  td = thisLabel.parentNode;
  td.innerHTML = "";
  input = document.createElement("input");
  input.id = "project";
  input.type = "hidden";
  input.value = item[0].project;
  td.appendChild(input);
  label = document.createElement("label");
  label.innerText = "Note";
  td.appendChild(label);
  br = document.createElement("br");
  td.appendChild(br);
  textarea = document.createElement("textarea");
  textarea.cols = "50";
  textarea.rows = "1";
  textarea.id = `note`;
  textarea.size = "50";
  textarea.innerText = item[0].note;
  td.appendChild(textarea);

  console.log(buttons.length);
  let priority = buttons[0].parentNode;
  priority.innerHTML = "";
  label = document.createElement("label");
  label.innerText = "priority";
  priority.appendChild(label);
  br = document.createElement("br");
  priority.appendChild(br);
  input = document.createElement("input");
  input.id = `priority`;
  input.size = "5";
  input.type = "number";
  input.value = item[0].priority;
  priority.appendChild(input);

  let save = buttons[1].parentNode;
  save.innerHTML = "";
  button = document.createElement("button");
  button.innerText = "Save";
  button.setAttribute("class", "button-2");
  button.setAttribute("onclick", `updateThis('${item[0].rid}')`);
  save.appendChild(button);

  document.getElementById("note").focus();
 });
}

function deleteThis(id) {
 console.info(id);
 let x = confirm("Are you sure you want to delete this");
 if (x === true) {
  let postData = {
   rid: id,
  };
  $.post("php/deleteThis.php", JSON.stringify(postData), (r) => {
   let response = r.trim();
   console.info(response);
   document.location.href = "/";
  });
 }
}

function saveThis() {
 console.info(`Save this`);
 let project = document.getElementById("project").value;
 let note = document.getElementById("note").value;
 let priority = document.getElementById("priority").value;
 let postData = {
  project: project,
  note: note,
  priority: priority,
  done: 0,
 };
 $.post("php/saveThis.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.log(response);
  document.location.href = "/";
 });
}

function updateThis(id) {
 console.info(`Update this`);
 let project = document.getElementById("project").value;
 let note = document.getElementById("note").value;
 let priority = document.getElementById("priority").value;
 let postData = {
  rid: id,
  project: project,
  note: note,
  priority: priority,
  done: 0,
 };
 $.post("php/updateThis.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.log(response);
  document.location.href = "/";
 });
}
