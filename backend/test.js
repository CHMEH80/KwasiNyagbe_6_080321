/**
 * [mask description]
 *
 * @param   {String}  email   [email description]
 * @param   {Boolean}  reveal  [reveal description]
 *
 * @return  {String}          [return description]
 */
function mask(email, reveal=false){
  let code;
  let newMail = "";
  let arobase = false;
  for(let i=0, size = email.length; i<size; i++){
    if (email[i] === "@"){
      arobase = true;
      newMail +="@";
      continue;
    }
    if (arobase && email[i] === "."){
      newMail += email.slice(i);
      break;
    }
    if (reveal) code = email.charCodeAt(i) +800;
    else code = email.charCodeAt(i) -800;
    newMail += String.fromCharCode(code);
  }
  return newMail;
}

function unmask(email){
  return mask(email,true)
}

console.log(mask("kwasi@gmail.com"))
console.log(unmask("﵋ﵗ﵁ﵓ﵉@﵇﵍﵁﵉﵌.com"))