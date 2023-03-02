import * as pages from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  const { pathname } = window.location;

  pages.all();

  switch (pathname) {
    case '/':
      pages.home();
      break;
    case '/work':
      pages.workList();
      break;
    case '/culture':
      pages.culture();
      break;
    case '/blog':
      pages.blog();
      break;
    case '/careers':
      pages.careersList();
      break;
    default:
      if (pathname.includes('/work/')) {
        console.log('woohoo');
        pages.workTemplate();
      }
      break;
  }
});
