import * as pages from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  const { pathname } = window.location;

  pages.all();

  switch (pathname) {
    case '/blog':
      pages.blog();
      break;
    case '/careers':
      pages.careersList();
      break;
    case '/culture':
      pages.culture();
      break;
    case '/':
      pages.home();
      break;
    case '/work':
      pages.workList();
      break;
    case pathname.includes('/work/'):
      pages.workTemplate();
      break;
  }
});
