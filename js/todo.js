/**
 * @package todo.js
 */

_.ready(() => {
 //
 _.get("php/listTasks.php", (r) => {
  let response = r.trim();

  var button, checkbox, label, td, tr;

  let tbl = document.getElementById("todoTbl");
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

   /*****************************************************************************/

   /**
    *! A spacer
    */
   td = document.createElement("td");
   td.innerHTML = "&nbsp;";
   tr.appendChild(td);

   /**
    *! The project
    */
   td = document.createElement("td");
   td.setAttribute("nowrap", "nowrap");
   label = document.createElement("label");
   label.innerText = item.project;
   td.appendChild(label);
   tr.appendChild(td);
   /*****************************************************************************/

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
   switch (item.priority) {
    case "1":
     label.classList.add("yellowTextBold");
     break;
    case "2":
     label.classList.add("yellowText");
     break;
    default:
     label.classList.add("whiteText");
     break;
   }

   if (item.done === "1") {
    label.classList.add("strikeThrough");
   } else {
    label.classList.remove("strikeThrough");
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
 /**
  *~ Variables
  */
 var button, br, input, label, td, textarea, tr;
 let tbl = document.getElementById("todoTbl");

 tr = document.createElement("tr");

 /**
  *! A spacer
  */
 td = document.createElement("td");
 td.innerHTML = "&nbsp;";
 tr.appendChild(td);

 /**
  *! A spacer
  */
 td = document.createElement("td");
 td.innerHTML = "&nbsp;";
 tr.appendChild(td);

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

 /**
  *~ Insert at the top of the list.
  */
 tbl.insertBefore(tr, tbl.childNodes[2]);

 /**
  *~ Place the cursor in the projects input field.
  */
 document.getElementById("project").focus();

 //
}

function checkboxChange(elem) {
 /**
  *~ The checkbox is checked or unchecked.
  */
 var postData;
 let id = elem.value;
 let thisParent = elem.parentNode.parentNode;
 let thisLabel = thisParent.querySelectorAll("label");

 if (elem.checked === true) {
  /**
   *~ The checkbox is checked
   */
  thisLabel.forEach((label) => {
   label.classList.add("strikeThrough");
  });

  postData = {
   id: id,
   done: true,
  };

  //
 } else {
  /**
   *~ The checkbox is unchecked.
   */
  thisLabel.forEach((label) => {
   label.classList.remove("strikeThrough");
  });

  postData = {
   id: id,
   done: false,
  };

  //
 }

 /**
  *~ Record the done state, checkbox checked it's done
  *~ checkbox unchecked it's not done.
  */
 _.post("php/taskDone.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.info(response);
  document.location.href = "/";
 });

 //
}

function editThis(elem) {
 /**
  ** Clear the console
  */
 console.clear();

 /**
  *~ Variables
  */
 var br, button, buttons, id, input, label, priority, save, textarea, td;

 /**
  *~ Get the database row ID of this item.
  */
 let checkbox = elem.parentNode.parentNode.querySelector(
  "input[type=checkbox]"
 );
 id = checkbox.value;

 /**
  *~ We are going to get this item from the database
  *~ Make up a request object
  */
 let postData = {
  rid: id,
 };

 /**
  *~ Post off the request
  */
 _.post("php/listTasks.php", JSON.stringify(postData), (r) => {
  /**
   *~ Trim the reply
   */
  let response = r.trim();

  /**
   *~ Make an object of the trimmed reply
   */
  let obj = JSON.parse(response);

  /**
   *~ Loop through the object
   */
  obj.forEach((item) => {
   /**
    *~ Get all the buttons on the page
    */
   buttons = elem.parentNode.parentNode.querySelectorAll("button");

   /**
    *~ Get the table cell that contains the content of the todo
    *~ item and empty it.
    */
   tds = elem.parentNode.parentNode.querySelectorAll("label");
   td = tds[1].parentNode;
   td.innerHTML = "";

   /**
    *~ Create a hidden input to contain the project name
    */
   input = document.createElement("input");
   input.id = "project";
   input.type = "hidden";
   input.value = item.project;
   td.appendChild(input);

   /**
    *~ Create a label to indicate what this input is.
    */
   label = document.createElement("label");
   label.innerText = "Note";
   td.appendChild(label);

   /**
    *~ A new line
    */
   br = document.createElement("br");
   td.appendChild(br);

   /**
    *~ A text area for the content of the todo item
    */
   textarea = document.createElement("textarea");
   textarea.cols = "50";
   textarea.rows = "1";
   textarea.id = `note`;
   textarea.size = "50";
   textarea.title = `Press Ctrl End key to place the curson at the end if the content.`;
   textarea.innerText = item.note;
   td.appendChild(textarea);

   /**
    *~ Replace the first button with the todo's priority
    *~ Empty the table cell
    */
   priority = buttons[0].parentNode;
   priority.innerHTML = "";

   /**
    *~ Create a label to indicate what this input is
    */
   label = document.createElement("label");
   label.innerText = "priority";
   priority.appendChild(label);

   /**
    *~ New line
    */
   br = document.createElement("br");
   priority.appendChild(br);

   /**
    *~ The input for the todo item's priority
    */
   input = document.createElement("input");
   input.id = `priority`;
   input.size = "5";
   input.type = "number";
   input.value = item.priority;
   priority.appendChild(input);

   /**
    *~ Create a save button
    *~ Empty the second button table cell of it's content.
    */
   save = buttons[1].parentNode;
   save.innerHTML = "";

   /**
    *~ Create a save button.
    */
   button = document.createElement("button");
   button.innerText = "Save";
   button.setAttribute("class", "button-2");
   button.setAttribute("onclick", `updateThis('${item.rid}')`);
   save.appendChild(button);

   //
  });

  /**
   *~ Place the cursor in the text area
   */
  document.getElementById("note").focus();

  //
 });
}

function deleteThis(id) {
 console.info(id);

 /**
  *~ Get conformation of this action
  */
 let x = confirm("Are you sure you want to delete this");

 /**
  *~ If the conformation is true.
  *~ Make a request object of the ID.
  */
 if (x === true) {
  let postData = {
   rid: id,
  };

  /**
   *~ Post off the request.
   */
  _.post("php/deleteThis.php", JSON.stringify(postData), (r) => {
   let response = r.trim();
   console.info(response);
   document.location.href = "/";
  });
 }
}

function saveThis() {
 /**
  *~ This is from the create a new todo item
  */
 let project = document.getElementById("project").value;
 let note = document.getElementById("note").value;
 let priority = document.getElementById("priority").value;
 let postData = {
  project: project,
  note: note,
  priority: priority,
  done: 0,
 };
 _.post("php/saveThis.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.log(response);
  document.location.href = "/";
 });
}

function updateThis(id) {
 /**
  *~ This is from the edit a todo item.
  */
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
 _.post("php/updateThis.php", JSON.stringify(postData), (r) => {
  let response = r.trim();
  console.log(response);
  document.location.href = "/";
 });
}

/**
 ** Document cookies
 */

function sc(name, value, days) {
 var expires = "";
 if (days) {
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = `expires=${date.toUTCString()}`;
 }
 document.cookie = `${name}=${value}; ${expires}; path=/`;

 console.info(document.cookie);
}

function gc(cname) {
 var name = cname + "=";
 var ca = document.cookie.split(";");
 for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) === " ") c = c.substring(1);
  if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
 }
 return "";
}
