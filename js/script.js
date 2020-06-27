/**
 *  Teamtreehouse Full Stack JavaScript Techdegree project-3
 *  Build interactive form
 *
 */

/**
 * @event {`DOMContentLoaded`} - To document object model - @event fires when the initial HTML document has been completely loaded and parsed.
 * @constant {name} - Store DOM input object element.
 * @constant {email} - Store DOM input object element.
 * @constant {jobRole} - Store DOM select object element.
 * @constant {shirtSize} - Store DOM select object element.
 * @constant {shirtDesign} - Store DOM select object element.
 * @constant {shirtColors} - Store two dimensional array. Later to render colors base one t-shirt design.
 * @constant {cardNum} - Store DOM input object element.
 * @constant {zipCode} - Store DOM input object element.
 * @constant {cv} - Store DOM input object element.
 * @constant {expMonth} - Store DOM select object element.
 * @constant {expYear} - Store DOM select object element.
 * @constant {colorDropdown} - Store DOM select object element.
 * @constant {payment} - Store DOM select object element.
 * @constant {otherJobRole} - Store DOM object element.
 * @constant {otherJobRoleInput} - Store DOM input object element.
 * @constant {paypalDiv} - Store DOM object element.
 * @constant {bitvoinDiv} - Store DOM object element.
 * @constant {creditCardDiv} - Store DOM object element.
 * @constant {activities} - Store DOM object element.
 * @constant {colorMenu} - Store DOM select object element.
 * @constant {allCheckBoxes} - Store all DOM input object elements.
 * @var {error} - Object variable to store errors.
 *
 *
 *
 */
document.addEventListener("DOMContentLoaded", () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#mail");
  const jobRole = document.querySelector("#title");
  const shirtSize = document.querySelector("#size");
  const shirtDesign = document.querySelector("#design");
  const shirtColors = [
    [
      "Cornflower Blue (JS Puns Shirt only)",
      "Dark Slate Grey (JS Puns Shirt only)",
      "Gold (JS Puns Shirt only)",
    ],
    [
      "Tomato (I &#9829; JS shirt only)",
      "Steel Blue (I &#9829; JS shirt only)",
      "Dim Grey (I &#9829; JS shirt only)",
    ],
  ];
  const cardNum = document.querySelector("#cc-num");
  const zipCode = document.querySelector("#zip");
  const cv = document.querySelector("#cvv");
  const expMonth = document.querySelector("#exp-month");
  const expYear = document.querySelector("#exp-year");
  const colorDropdown = document.querySelector("#color");
  const payment = document.querySelector("#payment");
  const otherJobRole = document.querySelector(".other-title");
  const otherJobRoleInput = otherJobRole.querySelector("#other-title");
  const paypalDiv = document.querySelector("#paypal");
  const bitcoinDiv = document.querySelector("#bitcoin");
  const creditCardDiv = document.querySelector("#credit-card");

  const activities = document.querySelector(".activities");
  const colorMenu = document.querySelector("#colors-js-puns");
  const allCheckBoxes = activities.querySelectorAll("input");

  let error = {};

  /**
   * @function {`initForm`} - Sets form element values to default.
   * @method {`focus`} - Sets focus to DOM element, if it can be focused.
   * @function {`hideDiv`} - Call to hide DOM object element.
   * @property {`selectedIndex`} - Sets default selected option.
   * @property {`value`} - Sets default input value.
   * @function {`initCheckboxes`} - Call to set checkboxes to default.
   * @function {`removeTotal`} - Call to remove total price DOM element.
   */
  function initForm() {
    name.focus();
    hideDiv(otherJobRole);
    hideDiv(colorMenu);
    hideDiv(paypalDiv);
    hideDiv(bitcoinDiv);
    payment.selectedIndex = 1;
    shirtSize.selectedIndex = 1;
    jobRole.selectedIndex = 0;
    name.value = "";
    email.value = "";
    shirtDesign.selectedIndex = 0;
    initCheckboxes(enable);
    cardNum.value = "";
    zipCode.value = "";
    cv.value = "";
    otherJobRoleInput.value = "";
    expMonth.selectedIndex = 0;
    expYear.selectedIndex = 0;
    error = {};
    removeTotal();
  }
  /**
   * @function {`initForm`} - Call to initialize form
   */
  initForm();

  // init activities array
  let activitiesArr = [];

  /**
   * @function {`addActivity`} - Pushes checked activity to @var {activitiesArr} array.
   * @param {activity} - Variable of activity.
   * @method {`push`} - Pushes item to the end of array.
   *
   */
  function addActivity(activity) {
    activitiesArr.push(activity);
  }

  /**
   * @function {`displayTotal`} - Creates DOM object element, calculates total sum of activities cost and appends newly created DOM object to parentNode.
   * @property {`textContent`} - Sets DOM element text content.
   * @function {`calcTotalActivities`} - Call to calculate total sum of activities array. @returns total sum.
   * @method {`appendChild`} - Appends element to the end of children list of parentNode.
   */
  function displayTotal() {
    const totalDiv = document.createElement("div");
    totalDiv.textContent = `Total: $ ${calcTotalActivities(activitiesArr)}`;
    activities.appendChild(totalDiv);
  }
  /**
   * @function {`removeActivity`} - Removes activity from activities array at specific index.
   * @param {index} - Variable of data type number.
   * @property {`splice`} - @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
   */
  function removeActivity(index) {
    activitiesArr.splice(index, 1);
  }
  /**
   * @function {`ifHasTotal`} - Checks if has total div element in @constant { activities }
   * @property {`lastElementChild`} - Returns last element child from element on which its called.
   * @property {'tagName'} - Returns tag name of element on which its called.
   * @function {`removeTotal`} - Call to remove DOM object.
   */
  function ifHasTotal() {
    // Checks if parentNode last element child tag name is equal to 'DIV'
    if (activities.lastElementChild.tagName === "DIV") {
      removeTotal();
    }
  }
  /**
   * @function {`removeTotal`} - Removes total sum DIV.
   * @method {`removeChild`} - Removes child of element on which is called.
   * @property {`lastElementChild`} - Returns last element child on element which its called.
   *
   */
  function removeTotal() {
    activities.removeChild(activities.lastElementChild);
  }
  /**
   * @function {`loopThroughCheckboxes`} - Loops through all checkboxes and if conditional statement equals true run first class citizen function.
   * @param {func} - First class citizen function.
   * @param {event} - Variable of event.
   * @param {arr} - Variable of array.
   * @property {`lenght`} - Returns total lenght of array.
   * @property {`dataset`} - @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
   * @property {`dayAndTime`} - Returns day and time of event.
   *
   */
  function loopThroughCheckboxes(func, event, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (event.dataset.dayAndTime === arr[i].dataset.dayAndTime) {
        //Call first class citizen function to every checkbox event
        func(arr[i]);
      }
    }
  }
  /**
   * @function {`disable`} - Base on conditional statement, sets checkbox @property{`disabled`} to true and checkbox @property {`nextSibling`}, @property {`parentNode`}, @property {`style`}, @property {`textDecoration`} to line through.
   * @param {checkbox} - Variable of current checkbox.
   * @property {`disabled`} - To set checkbox disabled property to true.
   * @property {`nextSibling`} - Returns the node immediately following the specified one in their parent's childNodes.
   * @property {`parentNode`} - Returns parent node of element on which its called.
   * @property {`style`} - Object property that contains a list of style properties.
   * @property {`textDecoration`} - Sets element CSS property to line through.
   */
  function disable(checkbox) {
    if (!checkbox.checked) {
      checkbox.disabled = true;
      checkbox.nextSibling.parentNode.style.textDecoration = "line-through";
    }
  }
  /**
   * @function {`enable`} - Sets checkbox @property {`disabled`} to false and sets checkbox @property {`nextSibling`}, @property {`parentNode`}, @property {`style`}, @property {`textDecoration`} to empty.
   * @param {checkbox} - Variable of current checkbox.
   * @property {`nextSibling`} - Returns the node immediately following the specified one in their parent's childNodes.
   * @property {`parentNode`} - Returns parent node of element on which its called.
   * @property {`style`} - Object property that contains a list of style properties.
   * @property {`textDecoration`} - Sets element CSS property to line through.
   */
  function enable(checkbox) {
    checkbox.disabled = false;
    checkbox.nextSibling.parentNode.style.textDecoration = "";
  }

  /**
   * Loops through every checkbox in @constant {allCheckBoxes} array.
   * @property {`lenght`} - Returns total lenght of array.
   * @method {`addEventListener`} - Listens on checkbox @event {`change`}
   * @constant {event} - Store targeted event.
   * @property {checked} - Returns boolean (true or false) if checkbox is checked.
   * @function {`addActivity`} - Call to push targeted checkbox
   * @property {`lenght`} - Returns total lenght of array.
   * @function {`ifHasTotal`} - Call to check if has total div.
   * @function {`displayTotal`} - Call to display total sum of @var {activitiesArr} array.
   * @function {`loopsThroughCheckboxes`} - Call to loop through all checkboxes.
   * @function {`removeActivity`} - Call to remove activity from activities array.
   *
   *  */

  for (let i = 0; i < allCheckBoxes.length; i++) {
    allCheckBoxes[i].addEventListener("change", (e) => {
      const event = e.target;

      //checks if event is checked
      if (event.checked) {
        addActivity(event);
        // checks if activities array lenght is greater than zero
        if (activitiesArr.length > 0) {
          ifHasTotal();
          displayTotal();
        }

        loopThroughCheckboxes(disable, event, allCheckBoxes);
      } else {
        // if event is unchecked then base on event index, event is removed from activities array
        removeActivity(activitiesArr.indexOf(event));
        // checks again if activities array is greater than zero
        if (activitiesArr.length > 0) {
          ifHasTotal();
          displayTotal();
        } else {
          ifHasTotal();
        }
        loopThroughCheckboxes(enable, event, allCheckBoxes);
      }
    });
  }
  /**
   * @function {calcTotalActivities} - Loops through each activity in array and returns total price.
   * @param {arr} - Array variable of activities.
   * @var {total} - Initialize total sum.
   * @constant {price} - Store every price value .
   * @property {`dataset`} - @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
   * @property {`cost`} - Returns current activity price.
   * @function {`parseInt`} - Parses a string argument to integer.
   * @returns Total amount of activities cost.
   */
  function calcTotalActivities(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      const price = parseInt(arr[i].dataset.cost);
      // calculate sum of activities
      total += price;
    }
    return total;
  }
  /**
   * @function {`initCheckboxes`} - Unchecks all checkboxes who was checked.
   * @param {func} - First class citizen function.
   * @property {`lenght`} - Returns total lenght of array.
   * @property {`checked`} - Set every checkbox checked property to false.
   *
   */
  function initCheckboxes(func) {
    for (let i = 0; i < allCheckBoxes.length; i++) {
      allCheckBoxes[i].checked = false;
      func(allCheckBoxes[i]);
    }
  }

  /**
   *
   * @param {div} - Variable of DOM object.
   * @property {className} - Sets element class attribute.
   *
   */
  function hideDiv(div) {
    div.className = "is-hidden";
  }
  /**
   *
   * @param {div} - Variable of DOM object.
   * @property {className} - Sets element class attribute to empty.
   *
   */
  function removeClass(div) {
    div.className = "";
  }
  /**
   *  @function {renderOptions} - Takes array as argument and renders option html tag for select dropdown.
   * @param {arr} - Array variable of shirt design colors.
   * @property {`lenght`} - Returns total lenght of array.
   * @var {html} - Variable to store html.
   * @returns HTML structure.
   */
  function renderOptions(arr) {
    let html = "";
    for (let i = 0; i < arr.length; i++) {
      html += `<option>${arr[i]}</option>`;
    }
    return html;
  }

  /**
   * @method {`addEventListener`} - @listens on @event {`change`} on @constant {shirtDesign} dropdown.
   * @property {`target`} - Of event object.
   * @property {`options`} - Returns HTMLOptionsCollection of the option elements contained by the select html.
   * @property {`selectedIndex`} - @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
   * @property {`value`} - Returns value.
   * @property {`innerHTML`} - Sets html markup.
   * @function {`removeClass`} - Removes hidden class from DOM element.
   * @function {`renderOptions`} - Renders option html base on array argument.
   *
   */
  shirtDesign.addEventListener("change", (e) => {
    console.log(e.target);
    switch (e.target.options[e.target.options.selectedIndex].value) {
      case "js puns":
        removeClass(colorMenu);
        colorDropdown.innerHTML = "";
        colorDropdown.innerHTML += renderOptions(shirtColors[0]);
        break;
      case "heart js":
        removeClass(colorMenu);
        colorDropdown.innerHTML = "";
        colorDropdown.innerHTML += renderOptions(shirtColors[1]);
        break;
    }
  });
  /**
   * @method {`addEventListener`} - @listens on @event {`change`} on @constant {payment} dropdown.
   * @property {`target`} - Of event object.
   * @property {`options`} - Returns HTMLOptionsCollection of the option elements contained by the select html.
   * @property {`selectedIndex`} - @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
   * @property {`value`} - Returns value.
   * @function {`hideDiv`} - Call to hide DOM element.
   * @function {`removeClass`} - Removes hidden class from DOM element.
   *
   */
  payment.addEventListener("change", (e) => {
    switch (e.target.options[e.target.options.selectedIndex].value) {
      case "credit card":
        removeClass(creditCardDiv);
        hideDiv(paypalDiv);
        hideDiv(bitcoinDiv);
        break;
      case "paypal":
        removeClass(paypalDiv);
        hideDiv(creditCardDiv);
        hideDiv(bitcoinDiv);
        break;
      case "bitcoin":
        removeClass(bitcoinDiv);
        hideDiv(paypalDiv);
        hideDiv(creditCardDiv);
        break;
    }
  });
  /**
   * @method {`addEventListener`} - @listens on @event {`change`} on @constant {jobRole} dropdown.
   * @property {`target`} - Of event object.
   * @property {`options`} - Returns HTMLOptionsCollection of the option elements contained by the select html.
   * @property {`selectedIndex`} - @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
   * @property {`value`} - Returns value.
   * @function {`hideDiv`} - Call to hide DOM element.
   * @function {`removeClass`} - Removes hidden class from DOM element.
   *
   */
  jobRole.addEventListener("change", (e) => {
    // checks if selected value is equal 'other'. If it is show other job role input and set focus to it. if not hide it
    if (e.target.options[e.target.options.selectedIndex].value === "other") {
      removeClass(otherJobRole);
      otherJobRoleInput.focus();
    } else {
      hideDiv(otherJobRole);
    }
  });

  /**
   * @method {`addEventListener`} - @listens on form @event {`submit`}.
   * @method {`preventDefault`} - Stops form default submit behavior.
   * @var {job} - Variable to store job role value.
   * @function {`displayError`} - Creates and displays error and checks if already error message exists.
   * @function {`createsError`} - Creates and displays error.
   * @function {`ifHasError`} - Checks if exists error message.
   * @function {`removeErrorDiv`} - If has error div - removes it.
   *
   */

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let job;

    /**
     *
     * @param {input} - Variable of DOM element.
     * @param {errProp} - Variable of data type string.
     * @param {text} - Variable of data type string.
     */
    function displayError(input, errProp, text) {
      /**
       *
       * @param {input} - Variable of DOM element .
       * @param {errProp} - Variable of error property value.
       * @param {text} - Variable of error value
       * @method {`createElement`} - creates DOM element.
       * @property {`style`} - Object property that contains a list of style properties.
       * @property {`border`} - Sets element CSS border property.
       * @property {`color`} - Sets element CSS color property.
       * @property {'tagName'} - Returns tag name of element on which its called.
       * @property {`margin`} - Sets element CSS margin property.
       * @property {`marginBottom`} - Sets element CSS marginBottom property.
       * @property {`textContent`} - Sets element text content property.
       * @property {`parentNode`} - Returns parent node of element on which its called.
       * @method {`insertBefore`} - Inserts a node before a reference node as a child of a specified parent node.
       */
      function createError(input, errProp, text) {
        // sets error property and its value
        error[errProp] = text;

        const errDiv = document.createElement("div");
        // checks if tag name equals 'input'
        if (input.tagName === "INPUT") {
          // if input add border
          input.style.border = "2px solid red";
        } else {
          // if not input set margin,color and marginBottom
          input.style.margin = "0px";
          input.style.color = "red";
          errDiv.style.marginBottom = "15px";
        }

        errDiv.textContent = error[errProp];
        errDiv.style.color = "red";
        input.parentNode.insertBefore(errDiv, input);
      }
      /**
       * @function {`ifHasError`} - Checks if error div element exists.
       * @property {`previousElementSibling`} - Returns element previous element sibling on which its called.
       * @returns boolean (true or false).
       */
      function ifHasError() {
        if (input.previousElementSibling) {
          return input.previousElementSibling.tagName === "DIV";
        } else {
          return false;
        }
      }
      // Check for error div
      if (ifHasError()) {
        // call to remove old error div
        removeErrorDiv(input);
        // call to create new
        createError(input, errProp, text);
      } else {
        // if dont have error div then create it
        createError(input, errProp, text);
      }
    }
    /**
     * @function {`removeErrorDiv`} - Checks if error div exists - if exists then remove - if doesn't exists then stop function from running.
     * @param {input} - Variable of DOM element.
     * @property {`previousElementSibling`} - Returns element previous element sibling on which its called.
     * @method {`removeChild`} - Removes child of element on which is called.
     * @property {`parentNode`} - Returns parent node of element on which its called.
     * @property {`style`} - Object property that contains a list of style properties.
     * @property {`border`} - Sets element CSS border property.
     * @property {`color`} - Sets element CSS color property.
     * @property {`marginBottom`} - Sets element CSS marginBottom property.
     */
    function removeErrorDiv(input) {
      //Checks if previous element sibling does't exists - if true? then return function from running.
      if (input.previousElementSibling === null) {
        return;
      } else {
        if (input.previousElementSibling.tagName === "DIV") {
          input.parentNode.removeChild(input.previousElementSibling);
          input.style.border = "";
          input.style.color = "";
          input.style.marginBottom = "1.125em";
        }
      }
    }
    /**
     * @function {`validateEmail`} - Validate email, accepts if email is passes email regular expression.
     * @param {email} - Variable of email.
     * @method {`test`} - Tests if passed string design pattern is equal to regular expression.
     * @returns boolean (true or false).
     */
    function validateEmail(email) {
      return /^[^@][a-z0-9]*([-|.|_]{1})?[a-z0-9]*?@[a-z]*\.[a-z]{2,3}$/g.test(
        email
      );
    }
    /**
     * @function {`validateName`} - Validate name, accepts if name is 3 characters long and checks if name is with surname, then also surname is 3 characters long.
     * @param {name} - Variable of name.
     * @method {`test`} - Tests if passed string design pattern is equal to regular expression.
     * @returns boolean (true or false).
     */
    function validateName(name) {
      return /^[a-z]{3,}\s?([a-z]{3,})?$/i.test(name);
    }
    /**
     * Checks if name input is empty, if it is, calls @function {`displayError`}. Otherwise if input not empty then checks if name input is valid,
     * if name isn't valid calls @function {`displayError`}, or if name is valid then remove error from @var {error} object, and call @function {`removeErrorDiv`}.
     */
    if (name.value === "") {
      displayError(name, "name", "The name field is required!");
    } else {
      if (validateName(name.value)) {
        error.name = "";
        removeErrorDiv(name);
      } else {
        displayError(name, "name", "Please check your name!");
      }
    }
    /**
     * Checks if email input is empty, if it is, calls @function {`displayError`}. Otherwise if input not empty then checks if email input is valid,
     * if email isn't valid calls @function {`displayError`}, or if email is valid then remove error from @var {error} object, and call @function {`removeErrorDiv`}.
     */
    if (email.value === "") {
      displayError(email, "email", "The email field is required!");
    } else {
      error.email = "";
      removeErrorDiv(email);
      if (validateEmail(email.value)) {
        error.email = "";
        removeErrorDiv(email);
      } else {
        displayError(email, "email", "Please check your email address!");
      }
    }
    /**
     * @var {counter} - Initialize counter variable. Which will be increased if checkbox @property {`checked`} will not be equal to true
     * @property {`lenght`} - Returns total lenght of array.
     * @property {checked} - Returns boolean (true or false) if checkbox is checked.
     */
    let counter = 0;
    for (let i = 0; i < allCheckBoxes.length; i++) {
      if (allCheckBoxes[i].checked !== true) {
        counter++;
      }
    }
    /**
     * Checks if @var {counter} - is less than seven, then remove error from @var {error}, and call @function {`removeErrorDiv`},
     * if counter is equal to seven then call @function {`displayError`}.
     *
     */
    if (counter < 7) {
      error.activities = "";
      removeErrorDiv(activities.querySelector("legend"));
    } else {
      displayError(
        activities.querySelector("legend"),
        "activities",
        "At least one must be selected!"
      );
    }

    /**
     *  Checks if job role dropdown is selected to 'other' - if it is, set @var {job} to @constant {otherJobRoleInput} value. If not? set @var {job} value to @constant {jobRole} value.
     */
    if (jobRole.value === "other") {
      job = otherJobRoleInput.value;
    } else {
      job = jobRole.value;
    }
    /**
     * @function {`validateCardNumber`} - Validate credit card number, accepts if card number is between 13 and 16 digital characters long.
     * @param {number} - Variable of number.
     * @method {`test`} - Tests if passed string design pattern is equal to regular expression.
     * @returns boolean (true or false).
     */
    function validateCardNumber(number) {
      return /^\d{13,16}$/.test(number);
    }
    /**
     * @function {`validateZipCode`} - Validate credit card zip code, accepts if zip code is 5 digital characters long.
     * @param {number} - Variable of number.
     * @method {`test`} - Tests if passed string design pattern is equal to regular expression.
     * @returns boolean (true or false).
     */
    function validateZipCode(number) {
      return /^\d{5}$/.test(number);
    }
    /**
     * @function {`validateCVV`} - Validate credit card cvv code, accepts if cvv code is 3 digital characters long.
     * @param {number} - Variable of number.
     * @method {`test`} - Tests if passed string design pattern is equal to regular expression.
     * @returns boolean (true or false).
     */
    function validateCVV(number) {
      return /^\d{3}$/.test(number);
    }
    // Checks if payment method is selected 'credit card'
    if (payment.value === "credit card") {
      /**
       * Checks if card num input is empty, if it is, calls @function {`displayError`}. Otherwise if input not empty then checks if card num input is valid,
       * if card num isn't valid calls @function {`displayError`}, or if card num is valid then remove error from @var {error} object, and call @function {`removeErrorDiv`}.
       */
      if (cardNum.value === "") {
        displayError(cardNum, "cardNum", "Please enter credit card number!");
      } else {
        if (validateCardNumber(cardNum.value)) {
          removeErrorDiv(cardNum);
          error.cardNum = "";
        } else {
          displayError(
            cardNum,
            "cardNum",
            "Please check your credit card! Make sure credit card number is without spaces!"
          );
        }
      }
      /**
       * Checks if card zip code input is empty, if it is, calls @function {`displayError`}. Otherwise if input not empty then checks if card zip code input is valid,
       * if card zip code isn't valid calls @function {`displayError`}, or if card zip code is valid then remove error from @var {error} object, and call @function {`removeErrorDiv`}.
       */
      if (zipCode.value === "") {
        displayError(zipCode, "zipCode", "Field is required!");
      } else {
        if (validateZipCode(zipCode.value)) {
          error.zipCode = "";
          removeErrorDiv(zipCode);
        } else {
          displayError(zipCode, "zipCode", "Must be valid zip code!");
        }
      }
      /**
       * Checks if card cvv code input is empty, if it is, calls @function {`displayError`}. Otherwise if input not empty then checks if card cvv code input is valid,
       * if card cvv code isn't valid calls @function {`displayError`}, or if card cvv code is valid then remove error from @var {error} object, and call @function {`removeErrorDiv`}.
       */
      if (cv.value === "") {
        displayError(cv, "cv", "Field is required!");
      } else {
        if (validateCVV(cv.value)) {
          error.cv = "";
          removeErrorDiv(cv);
        } else {
          displayError(cv, "cv", "Must be valid cvv code!");
        }
      }
      // checks every error property - if none of error property exists then allow to submit form
      if (
        !error.name &&
        !error.email &&
        !error.activities &&
        !error.cardNum &&
        !error.zipCode &&
        !error.cv
      ) {
        // Log result to console
        console.log({
          name: name.value,
          email: email.value,
          tShirt: {
            size: shirtSize.value,
            design: shirtDesign.value,
            color: colorDropdown.value,
          },
          jobRole: job,
          activities: activitiesArr,
          card: {
            number: cardNum.value,
            zip: zipCode.value,
            cvv: cv.value,
            expMonth: expMonth.value,
            expYear: expYear.value,
          },
        });
        // Call to initialize form
        initForm();
      }
    } else {
      // checks every error property - if none of error property exists then allow to submit form
      if (!error.name && !error.email && !error.activities) {
        // Log result to console
        console.log({
          name: name.value,
          email: email.value,
          tShirt: {
            size: shirtSize.value,
            design: shirtDesign.value,
            color: colorDropdown.value,
          },
          jobRole: job,
          activities: activitiesArr,
        });
        // Call to initialize form
        initForm();
      }
    }
  });
});
