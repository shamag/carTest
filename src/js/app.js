// appslist
const iconsList = ['icon-Applicons.png', 'icon-AppStore.png', 'icon-Burnable.png', 'icon-Calculator.png', 'icon-CalendarBlank.png', 'icon-CalendarOfficial.png', 'icon-Calendar.png', 'icon-Camera.png', 'icon-CandyBar.png', 'icon-Clock.png', 'icon-CloudApp.png', 'icon-Cobook.png', 'icon-Compass.png', 'icon-Contacts.png', 'icon-DesignBriefs.png', 'icon-Developer.png', 'icon-Dictionary.png', 'icon-Doo.png', 'icon-Downloads.png', 'icon-DropStuff.png', 'icon-EasyFind.png', 'icon-FaceTime.png', 'icon-Finder.png', 'icon-FontExplorerX.png', 'icon-Game_Centeralt2.png', 'icon-Game_Centeralt3.png', 'icon-Game_Centeralt4.png', 'icon-Gemini.png', 'icon-Idea_Stuff_2.png', 'icon-Idea_Stuff.png', 'icon-Illustrator.png', 'icon-InDesign.png', 'icon-Internal.png', 'icon-iTunes_Store.png', 'icon-LaCie_FA_Porsche_2.png', 'icon-LaCie_FA_Porsche.png', 'icon-LaCie_Neil_Poulton.png', 'icon-LaCie_Rugged_2.png', 'icon-LaCie_Rugged.png', 'icon-Library.png', 'icon-Mail.png', 'icon-Maps.png', 'icon-Messages.png', 'icon-Misc_Designs_01.png', 'icon-Monosnap.png', 'icon-Music.png', 'icon-Newsstand.png', 'icon-Notes.png', 'icon-Passbook.png', 'icon-Phone.png', 'icon-Photoshop.png', 'icon-Photos.png', 'icon-Preview.png', 'icon-Reminders.png', 'icon-RSS_Notifier.png', 'icon-Safari.png', 'icon-Settings.png', 'icon-Smart.png', 'icon-Stocks.png', 'icon-System.png', 'icon-Time_Machine_Disk.png', 'icon-Time_Machine.png', 'icon-Trash_Empty.png', 'icon-Trash_Full.png', 'icon-Trash_Managed.png', 'icon-Twitter.png', 'icon-Users.png', 'icon-Videos.png', 'icon-Weather.png'];
//list of icons
const menuList = ['icon-Applicons.png', 'icon-Messages.png', 'icon-Stocks.png', 'icon-Library.png', 'icon-Preview.png', 'icon-Contacts.png'];
// some var and const
const screensEl = document.querySelector('.device-screens');
const pager = document.querySelector('.device-pager>ul');
const menu = document.querySelector('.device-menu');
const popup = document.querySelector('.device-popup');
let dragEl = null;
let dragName;
let dragImg;
let dragSrc;

// detect left button click
function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
}
// get name from filename
function getName(name) {
    return name.split('icon-')[1].split('.png')[0].split('_').join()
}
// create screens 
for (let i = 0; i < Math.ceil(iconsList.length / 20); i++) {
    let el = document.createElement('div');
    el.className = 'device-screen';
    screensEl.append(el);
    let pagerLi = document.createElement('li');
    pager.append(pagerLi);
};
// set active pager li
pager.querySelector('li').className = 'active';

// create menu items
menuList.forEach((el, i) => {
    let newEl = document.createElement('div');
    newEl.className = 'device-app';
    newEl.innerHTML = `<div class="device-app-icon"><img src="img/icons/${menuList[i]}" alt=""></div>
                       <div class="device-app-name">${getName(menuList[i])}</div>`;
    menu.append(newEl);
});

//create apps
iconsList.forEach((el, i) => {
    const curScreen = screensEl.querySelectorAll('.device-screen')[Math.floor(i / 20)];
    let newEl = document.createElement('div');
    newEl.className = 'device-app';
    newEl.innerHTML = `<div class="device-app-icon"><img src="img/icons/${iconsList[i]}" alt=""></div>
                       <div class="device-app-name">${getName(iconsList[i])}</div>`;
    curScreen.append(newEl);
})
const pagerSelector = '.device-pager>ul>li';
//  set popup window on menu clicks
Array.prototype.forEach.call(menu.querySelectorAll('.device-app-icon'), (el) => {
        el.addEventListener('click', (e) => {
            let curImg = el.querySelector('img').getAttribute('src');
            popup.querySelector('.device-popup-icon').style.background = `url(../${curImg}) no-repeat center`;
            popup.className = popup.className + ' active';
        })
    })
    // hide popup on click
popup.addEventListener('click', (e) => {
        popup.className = 'device-popup';
    })
    // make arrays
const pageList = Array.prototype.slice.call(document.querySelectorAll(pagerSelector));
const appList = Array.prototype.slice.call(document.querySelectorAll('.device-app'));

// slide between pages
pageList.forEach((el) => {
    el.addEventListener('click', (e) => {
        const liIndex = pageList.indexOf(e.target);
        screensEl.style.transform = `translateX(${ -100*liIndex }%)`;
        pageList.forEach(function (el) {
            el.className = '';
        })
        e.target.className = 'active';

    })
})

// set drag and drop
appList.forEach((el) => {
    el.querySelector('.device-app-icon').addEventListener('mousedown', (e) => {
        if (!detectLeftButton(e)) return;
        dragSrc = el;
        dragEl = document.createElement('div');
        dragEl.className = 'drag-element';
        dragName = el.querySelector('.device-app-name').innerHTML;
        dragImg = el.querySelector('img').getAttribute('src');
        dragEl.style.background = `url(../${dragImg}) no-repeat center`
        document.querySelector('body').append(dragEl);
        e.preventDefault();
    })
})
window.addEventListener('mouseup', (e) => {
    var parent = e.target.parentNode;
    if (parent.className === 'device-app-icon') {
        let tmpImg = e.target.getAttribute('src');
        let tmpName = parent.parentNode.querySelector('.device-app-name');
        dragSrc.querySelector('img').setAttribute('src', tmpImg);
        e.target.setAttribute('src', dragImg);
        dragSrc.querySelector('.device-app-name').innerHTML = tmpName.innerHTML;
        tmpName.innerHTML = dragName;
    }
    if (dragEl) {
        dragEl.parentNode.removeChild(dragEl);
    }
    dragEl = null;
})
window.addEventListener('mousemove', (e) => {
    if (dragEl) {
        dragEl.style.left = e.pageX + 10 + 'px';
        dragEl.style.top = e.pageY + 10 + 'px';
    }
})