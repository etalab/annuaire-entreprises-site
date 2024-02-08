/**
 * COPY TO CLIPBOARD FUNCTION
 */

function logCopyPaste(element) {
  try {
    const label = element.closest('tr').childNodes[0].innerText;
    var _paq = window._paq || [];
    _paq.push(['trackEvent', 'action', 'copyPaste', `${label}`]);
  } catch {}
}

function createCopyButton(element) {
  const childElement =
    element.children && element.children.length > 0 && element.children[0];
  const childElementWidth = childElement?.offsetWidth || 0;
  const parentElement = element?.parentElement;
  const parentElementWidth = parentElement?.offsetWidth || 0;

  const isChildrenTooLarge = childElementWidth + 75 >= parentElementWidth;

  // position copy/paste either next to text or justified to the right
  const rightPosition = isChildrenTooLarge ? 0 : -75;

  element.style.cursor = 'pointer';
  element.style.position = 'relative';

  const copyWrapper = document.createElement('div');
  copyWrapper.style.cursor = 'pointer';
  copyWrapper.style.position = 'absolute';
  copyWrapper.style.right = `${rightPosition}px`;
  copyWrapper.style.top = '0';

  const copyLabel = document.createElement('span');
  copyLabel.classList = 'pastebin-button';
  copyLabel.innerHTML = `
  <style>
    span.pastebin-button {
      position: relative;
      margin-left: 0;
      display: flex;
      align-items: end;
      flex-direction: row;
      box-shadow: ${rightPosition === 0 ? '-25px 0 8px  #fff' : ''};
    }
    span.pastebin-button > span {
      background-color: #dfdff1;
      border-radius: 3px;
      display: flex;
      align-items: center;
      padding: 0 3px;
      font-size: 0.9rem;
      box-shadow:  ${rightPosition === 0 ? '-25px 0 8px  #fff' : ''};
      color: #000091;
    }

    span.pastebin-button > span:last-of-type {
      display:none;
      color: green;
    }

    span.pastebin-button.copied > span:last-of-type {
      display:flex;
    }

    span.pastebin-button.copied > span:first-of-type {
      display:none;
    }

  </style>
  <span><svg
xmlns="http://www.w3.org/2000/svg"
width="15"
height="15"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
>
<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
<rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
</svg>&nbsp;copier</span>
<span><svg 
fill="none" 
xmlns="http://www.w3.org/2000/svg"  
viewBox="0 0 30 30" 
width="15" 
stroke="currentColor"
fill="none"  
stroke-linecap="round" 
stroke-linejoin="round" 
stroke-miterlimit="10" 
stroke-width="2"
height="15px">
  <path  d="M4 16L11 23 27 7"/>
</svg>&nbsp;collé&nbsp;!</span>`;

  const targetElement = parentElement || element;

  targetElement.addEventListener(
    'mouseenter',
    (event) => {
      copyLabel.classList = 'pastebin-button';
      copyWrapper.append(copyLabel);
      element.append(copyWrapper);
    },
    false
  );

  targetElement.addEventListener('mouseleave', (event) => {
    copyWrapper.remove();
    copyLabel.remove();
  });

  targetElement.onclick = () => {
    const el = document.createElement('textarea');
    copyLabel.classList = 'pastebin-button copied';
    let toCopy = element.children[0].innerHTML;
    if (element.className.indexOf('trim') > -1) {
      toCopy = toCopy.split(' ').join('');
    }
    el.value = toCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    logCopyPaste(element);
  };
}

function addAllCopyFunctions() {
  const copyList = document.getElementsByClassName('copy-button');
  for (var i = 0; i < copyList.length; i++) {
    const element = copyList[i];
    if (element) {
      createCopyButton(element);
    }
  }
}

if (typeof window !== 'undefined') {
  addAllCopyFunctions();
}
