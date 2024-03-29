import "./style.css";

import QuestionPage from "./page/QuestionPage";
import ResultPage from "./page/ResultPage";
import Loading from "./component/Loading";
import { eventQueue } from "./store/EventStore";
import { BaseClass } from "./page/Common";

import { goRoute } from "./util/util";
const a = 1;
const hashDiv = document.getElementById("hash-app");
let currentPage: BaseClass;
interface RouteInfo {
  [key: string]: BaseClass;
}

const routes: RouteInfo = {
  "#/": new QuestionPage(),
  "#/result": new ResultPage(),
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  currentPage = routes[window.location.hash];
  if (!currentPage) {
    goRoute("#/");
    return;
  }

  hashDiv.innerHTML = Loading();
  currentPage.beforeRender && (await currentPage.beforeRender());
  hashDiv.innerHTML = await currentPage.render(); // it is defaultRender
  await currentPage.attachEvent();
};

const renderThread = async () => {
  if (currentPage && eventQueue.length > 0) {
    let needEventUpdate: boolean = false;

    while (eventQueue.length > 0) {
      const render = eventQueue.shift();
      await render.fn(render.data);
      if (render.eventUpdate) {
        needEventUpdate = render.eventUpdate;
      }
    }
    if (needEventUpdate) {
      await currentPage.attachEvent();
    }
  }
};

// 10 ms 마다 render thread 발생
setInterval(renderThread, 10);

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", () => {
  if (window.location.hash === "") {
    window.location.hash = "#/";
  } else {
    router();
  }
});
