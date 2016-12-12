var iconsList = ['icon-Applicons.png', 'icon-AppStore.png', 'icon-Burnable.png', 'icon-Calculator.png', 'icon-CalendarBlank.png', 'icon-CalendarOfficial.png', 'icon-Calendar.png', 'icon-Camera.png', 'icon-CandyBar.png', 'icon-Clock.png', 'icon-CloudApp.png', 'icon-Cobook.png', 'icon-Compass.png', 'icon-Contacts.png', 'icon-DesignBriefs.png', 'icon-Developer.png', 'icon-Dictionary.png', 'icon-Doo.png', 'icon-Downloads.png', 'icon-DropStuff.png', 'icon-EasyFind.png', 'icon-FaceTime.png', 'icon-Finder.png', 'icon-FontExplorerX.png', 'icon-Game_Centeralt2.png', 'icon-Game_Centeralt3.png', 'icon-Game_Centeralt4.png', 'icon-Gemini.png', 'icon-Idea_Stuff_2.png', 'icon-Idea_Stuff.png', 'icon-Illustrator.png', 'icon-InDesign.png', 'icon-Internal.png', 'icon-iTunes_Store.png', 'icon-LaCie_FA_Porsche_2.png', 'icon-LaCie_FA_Porsche.png', 'icon-LaCie_Neil_Poulton.png', 'icon-LaCie_Rugged_2.png', 'icon-LaCie_Rugged.png', 'icon-Library.png', 'icon-Mail.png', 'icon-Maps.png', 'icon-Messages.png', 'icon-Misc_Designs_01.png', 'icon-Monosnap.png', 'icon-Music.png', 'icon-Newsstand.png', 'icon-Notes.png', 'icon-Passbook.png', 'icon-Phone.png', 'icon-Photoshop.png', 'icon-Photos.png', 'icon-Preview.png', 'icon-Reminders.png', 'icon-RSS_Notifier.png', 'icon-Safari.png', 'icon-Settings.png', 'icon-Smart.png', 'icon-Stocks.png', 'icon-System.png', 'icon-Time_Machine_Disk.png', 'icon-Time_Machine.png', 'icon-Trash_Empty.png', 'icon-Trash_Full.png', 'icon-Trash_Managed.png', 'icon-Twitter.png', 'icon-Users.png', 'icon-Videos.png', 'icon-Weather.png'];
var menuList = ['icon-Applicons.png', 'icon-Messages.png', 'icon-Stocks.png', 'icon-Library.png', 'icon-Preview.png', 'icon-Contacts.png'];
var screensEl = document.querySelector('.device-screens');
var pager = document.querySelector('.device-pager>ul');
var menu = document.querySelector('.device-menu');
var popup = document.querySelector('.device-popup');
var dragEl = null;
var dragName = void 0;
var dragImg = void 0;
var dragSrc = void 0;

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
}

function getName(name) {
    return name.split('icon-')[1].split('.png')[0].split('_').join();
}
for (var i = 0; i < Math.ceil(iconsList.length / 20); i++) {
    var el = document.createElement('div');
    el.className = 'device-screen';
    screensEl.append(el);
    var pagerLi = document.createElement('li');
    pager.append(pagerLi);
};
pager.querySelector('li').className = 'active';

menuList.forEach(function (el, i) {
    var newEl = document.createElement('div');
    newEl.className = 'device-app';
    newEl.innerHTML = '<div class="device-app-icon"><img src="img/icons/' + menuList[i] + '" alt=""></div>\n                       <div class="device-app-name">' + getName(menuList[i]) + '</div>';
    menu.append(newEl);
});

iconsList.forEach(function (el, i) {
    var curScreen = screensEl.querySelectorAll('.device-screen')[Math.floor(i / 20)];
    var newEl = document.createElement('div');
    newEl.className = 'device-app';
    newEl.innerHTML = '<div class="device-app-icon"><img src="img/icons/' + iconsList[i] + '" alt=""></div>\n                       <div class="device-app-name">' + getName(iconsList[i]) + '</div>';
    curScreen.append(newEl);
});
var pagerSelector = '.device-pager>ul>li';

Array.prototype.forEach.call(menu.querySelectorAll('.device-app-icon'), function (el) {
    el.addEventListener('click', function (e) {
        var curImg = el.querySelector('img').getAttribute('src');

        popup.querySelector('.device-popup-icon').style.background = 'url(' + curImg + ') no-repeat center';
        popup.className = popup.className + ' active';
    });
});
popup.addEventListener('click', function (e) {
    popup.className = 'device-popup';
});

var pageList = Array.prototype.slice.call(document.querySelectorAll(pagerSelector));
var appList = Array.prototype.slice.call(document.querySelectorAll('.device-app'));

pageList.forEach(function (el) {
    el.addEventListener('click', function (e) {
        var liIndex = pageList.indexOf(e.target);
        screensEl.style.transform = 'translateX(' + -100 * liIndex + '%)';
        pageList.forEach(function (el) {
            el.className = '';
        });
        e.target.className = 'active';
    });
});
appList.forEach(function (el) {
    el.querySelector('.device-app-icon').addEventListener('mousedown', function (e) {
        if (!detectLeftButton(e)) return;
        dragSrc = el;
        dragEl = document.createElement('div');
        dragEl.className = 'drag-element';
        dragName = el.querySelector('.device-app-name').innerHTML;
        dragImg = el.querySelector('img').getAttribute('src');
        dragEl.style.background = 'url(' + dragImg + ') no-repeat center';
        document.querySelector('body').append(dragEl);
        e.preventDefault();
    });
});
window.addEventListener('mouseup', function (e) {
    var parent = e.target.parentNode;
    if (parent.className === 'device-app-icon') {
        var tmpImg = e.target.getAttribute('src');
        var tmpName = parent.parentNode.querySelector('.device-app-name');
        dragSrc.querySelector('img').setAttribute('src', tmpImg);
        e.target.setAttribute('src', dragImg);
        dragSrc.querySelector('.device-app-name').innerHTML = tmpName.innerHTML;
        tmpName.innerHTML = dragName;
    }
    if (dragEl) {
        dragEl.parentNode.removeChild(dragEl);
    }
    dragEl = null;
});
window.addEventListener('mousemove', function (e) {
    if (dragEl) {
        dragEl.style.left = e.pageX + 10 + 'px';
        dragEl.style.top = e.pageY + 10 + 'px';
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyJdLCJuYW1lcyI6WyJpY29uc0xpc3QiLCJtZW51TGlzdCIsInNjcmVlbnNFbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhZ2VyIiwibWVudSIsInBvcHVwIiwiZHJhZ0VsIiwiZHJhZ05hbWUiLCJkcmFnSW1nIiwiZHJhZ1NyYyIsImRldGVjdExlZnRCdXR0b24iLCJldnQiLCJ3aW5kb3ciLCJldmVudCIsImJ1dHRvbnMiLCJidXR0b24iLCJ3aGljaCIsImdldE5hbWUiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwiaSIsIk1hdGgiLCJjZWlsIiwibGVuZ3RoIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kIiwicGFnZXJMaSIsImZvckVhY2giLCJuZXdFbCIsImlubmVySFRNTCIsImN1clNjcmVlbiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmbG9vciIsInBhZ2VyU2VsZWN0b3IiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImN1ckltZyIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBhZ2VMaXN0Iiwic2xpY2UiLCJhcHBMaXN0IiwibGlJbmRleCIsImluZGV4T2YiLCJ0YXJnZXQiLCJ0cmFuc2Zvcm0iLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJ0bXBJbWciLCJ0bXBOYW1lIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQ2hpbGQiLCJsZWZ0IiwicGFnZVgiLCJ0b3AiLCJwYWdlWSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTUEsWUFBWSxDQUFDLG9CQUFELEVBQXVCLG1CQUF2QixFQUE0QyxtQkFBNUMsRUFBaUUscUJBQWpFLEVBQXdGLHdCQUF4RixFQUFrSCwyQkFBbEgsRUFBK0ksbUJBQS9JLEVBQW9LLGlCQUFwSyxFQUF1TCxtQkFBdkwsRUFBNE0sZ0JBQTVNLEVBQThOLG1CQUE5TixFQUFtUCxpQkFBblAs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QSxPQUFHdkIsYUFBSCxDQUFpQixrQkFBakIsRUFBcUNzQyxnQkFBckMsQ0FBc0QsV0FBdEQsRUFBbUUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RFLFlBQUksQ0FBQy9CLGlCQUFpQitCLENBQWpCLENBQUwsRUFBMEI7QUFDMUJoQyxrQkFBVWdCLEVBQVY7QUFDQW5CLGlCQUFTTCxTQUFTeUIsYUFBVCxDQUF1QixLQUF2QixDQUFUO0FBQ0FwQixlQUFPcUIsU0FBUCxHQUFtQixjQUFuQjtBQUNBcEIsbUJBQVdrQixHQUFHdkIsYUFBSCxDQUFpQixrQkFBakIsRUFBcUM4QixTQUFoRDtBQUNBeEIsa0JBQVVpQixHQUFHdkIsYUFBSCxDQUFpQixLQUFqQixFQUF3QnlDLFlBQXhCLENBQXFDLEtBQXJDLENBQVY7QUFDQXJDLGVBQU9zQyxLQUFQLENBQWFDLFVBQWIsZUFBb0NyQyxPQUFwQztBQUNBUCxpQkFBU0MsYUFBVCxDQUF1QixNQUF2QixFQUErQjBCLE1BQS9CLENBQXNDdEIsTUFBdEM7QUFDQW1DLFVBQUVZLGNBQUY7QUFDSCxLQVZEO0FBV0gsQ0FaRDtBQWFBekMsT0FBTzRCLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQUNDLENBQUQsRUFBTztBQUN0QyxRQUFJYSxTQUFTYixFQUFFVSxNQUFGLENBQVNJLFVBQXRCO0FBQ0EsUUFBSUQsT0FBTzNCLFNBQVAsS0FBcUIsaUJBQXpCLEVBQTJDO0FBQ3ZDLFlBQUk2QixTQUFTZixFQUFFVSxNQUFGLENBQVNSLFlBQVQsQ0FBc0IsS0FBdEIsQ0FBYjtBQUNBLFlBQUljLFVBQVVILE9BQU9DLFVBQVAsQ0FBa0JyRCxhQUFsQixDQUFnQyxrQkFBaEMsQ0FBZDtBQUNBTyxnQkFBUVAsYUFBUixDQUFzQixLQUF0QixFQUE2QndELFlBQTdCLENBQTBDLEtBQTFDLEVBQWdERixNQUFoRDtBQUNBZixVQUFFVSxNQUFGLENBQVNPLFlBQVQsQ0FBc0IsS0FBdEIsRUFBNEJsRCxPQUE1QjtBQUNBQyxnQkFBUVAsYUFBUixDQUFzQixrQkFBdEIsRUFBMEM4QixTQUExQyxHQUFvRHlCLFFBQVF6QixTQUE1RDtBQUNBeUIsZ0JBQVF6QixTQUFSLEdBQW9CekIsUUFBcEI7QUFDSDtBQUNHLFFBQUlELE1BQUosRUFBWTtBQUNSQSxlQUFPaUQsVUFBUCxDQUFrQkksV0FBbEIsQ0FBOEJyRCxNQUE5QjtBQUNIO0FBQ0xBLGFBQVMsSUFBVDtBQUNILENBZEQ7QUFlQU0sT0FBTzRCLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFVBQUNDLENBQUQsRUFBTztBQUN4QyxRQUFJbkMsTUFBSixFQUFZO0FBQ1JBLGVBQU9zQyxLQUFQLENBQWFnQixJQUFiLEdBQW9CbkIsRUFBRW9CLEtBQUYsR0FBVSxFQUFWLEdBQWUsSUFBbkM7QUFDQXZELGVBQU9zQyxLQUFQLENBQWFrQixHQUFiLEdBQW1CckIsRUFBRXNCLEtBQUYsR0FBVSxFQUFWLEdBQWUsSUFBbEM7QUFDSDtBQUNKLENBTEQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImljb25zTGlzdCIsIm1lbnVMaXN0Iiwic2NyZWVuc0VsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFnZXIiLCJtZW51IiwicG9wdXAiLCJkcmFnRWwiLCJkcmFnTmFtZSIsImRyYWdJbWciLCJkcmFnU3JjIiwiZGV0ZWN0TGVmdEJ1dHRvbiIsImV2dCIsIndpbmRvdyIsImV2ZW50IiwiYnV0dG9ucyIsImJ1dHRvbiIsIndoaWNoIiwiZ2V0TmFtZSIsIm5hbWUiLCJzcGxpdCIsImpvaW4iLCJpIiwiTWF0aCIsImNlaWwiLCJsZW5ndGgiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJwYWdlckxpIiwiZm9yRWFjaCIsIm5ld0VsIiwiaW5uZXJIVE1MIiwiY3VyU2NyZWVuIiwicXVlcnlTZWxlY3RvckFsbCIsImZsb29yIiwicGFnZXJTZWxlY3RvciIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY3VySW1nIiwiZ2V0QXR0cmlidXRlIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwicGFnZUxpc3QiLCJzbGljZSIsImFwcExpc3QiLCJsaUluZGV4IiwiaW5kZXhPZiIsInRhcmdldCIsInRyYW5zZm9ybSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInRtcEltZyIsInRtcE5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVDaGlsZCIsImxlZnQiLCJwYWdlWCIsInRvcCIsInBhZ2VZIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxZQUFZLENBQUMsb0JBQUQsRUFBdUIsbUJBQXZCLEVBQTRDLG1CQUE1QyxFQUFpRSxxQkFBakUsRUFBd0Ysd0JBQXhGLEVBQWtILDJCQUFsSCxFQUErSSxtQkFBL0ksRUFBb0ssaUJBQXBLLEVBQXVMLG1CQUF2TCxFQUE0TSxnQkFBNU0sRUFBOE4sbUJBQTlOLEVBQW1QLGlC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
