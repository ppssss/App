import Vue from 'vue'

import 'mint-ui/lib/style.min.css'
import { Cell, Checklist,Button,Actionsheet,
        Swipe, SwipeItem,Navbar, TabItem,
        Tabbar,TabContainer, TabContainerItem,
        Search,InfiniteScroll, Loadmore,Header
        ,Badge,Field,
        } from 'mint-ui';

Vue.use(InfiniteScroll);

Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.component(Button.name, Button);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Search.name, Search);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
Vue.component(Badge.name, Badge);
Vue.component(Field.name, Field);

