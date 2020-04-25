import * as React from 'react';

export default (props: any) => {
  const href: string = document.location.href;
  let ifmodel = document.getElementById('popupModel');
  if (ifmodel) {
    // @ts-ignore
    if (href.indexOf('/wallet') > -1 || href.endsWith('#/')) {
      ifmodel.style.height = document.documentElement.clientHeight * 0.8 + 'px';
    } else {
      ifmodel.style.height = '0px';
    }
  } else {
    setTimeout(function() {
      ifmodel = document.getElementById('popupModel');
      if (ifmodel) {
        // @ts-ignore
        if (href.indexOf('/wallet') > -1 || href.endsWith('#/')) {
          ifmodel.style.height =
            document.documentElement.clientHeight * 0.8 + 'px';
        } else {
          ifmodel.style.height = '0px';
        }
      }
    }, 100);
  }
  return <div>{props.children}</div>;
};
