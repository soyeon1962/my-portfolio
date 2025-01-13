//##########풀페이지##########//
document.addEventListener('DOMContentLoaded', () => {
  new fullpage('#fullpage', {
    autoScrolling: true,
  });

  // 스크롤 잠금 테스트
  fullpage_api.setAllowScrolling(false); // 전체 스크롤 비활성화
  setTimeout(() => {
    fullpage_api.setAllowScrolling(true); // 5초 후 스크롤 활성화
  }, 16000);
});


//##########드레그이벤트##########//
function enableWindowDrag(selector){
  let isDragging = false;
  let dragStartX, dragStartY;
  let startTranslateX = 0;
  let startTranslateY = 0;

  const dragWindow = document.querySelector(selector);
  const titleBar = dragWindow.querySelector('.window-titlebar');

  const mouseDown = (e) => {    
    isDragging = true;
    dragStartX = e.pageX;
    dragStartY = e.pageY;

    const transform = window.getComputedStyle(dragWindow).transform;
    if(transform !== 'none'){
      const style = window.getComputedStyle(dragWindow);
      const dragMatrix = new DOMMatrixReadOnly(style.transform);
      startTranslateX = dragMatrix.m41;
      startTranslateY = dragMatrix.m42;
    }else{
      startTranslateX = 0;
      startTranslateY = 0;
    }
  };

  const mouseMove = (e) => {
    if(!isDragging) return;

    const moveX = e.pageX - dragStartX;
    const moveY = e.pageY - dragStartY;

    const translateX = startTranslateX + moveX;
    const translateY = startTranslateY + moveY;
    dragWindow.style.transform = `translate(${translateX}px, ${translateY}px)`
  };

  const mouseUp = () => {
    isDragging = false;
  };

  titleBar.addEventListener('mousedown', mouseDown);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);

};

enableWindowDrag('.skills-window-frame');
enableWindowDrag('.profile-window-frame');
enableWindowDrag('.skills-window-frame_01');
enableWindowDrag('.window-frame_01');
enableWindowDrag('.skills-window-frame_02');
enableWindowDrag('.window-frame_02');
enableWindowDrag('.skills-window-frame_03');
enableWindowDrag('.window-frame_03');
enableWindowDrag('.project-folder-window-frame');
enableWindowDrag('.window-frame-mini_01');
enableWindowDrag('.window-frame-mini_02');
enableWindowDrag('.window-frame-mini_03');
enableWindowDrag('.window-frame-mini_04');

//##########윈도우버튼##########//

//##########fetch(win98Dock.html)##########//
fetch("html/win98Dock.html")
.then(response => response.text())
.then(data => {
  document.querySelectorAll('#win98-dock').forEach(function(win98Dock){
    win98Dock.innerHTML = data;
  });

  //profile 더블클릭 이벤트
  const profileIcon = document.querySelector('.my-profile-icon');

  profileIcon.addEventListener('dblclick', function(){
    const profileWindowFrame = document.querySelector('.profile-window-frame');
    profileWindowFrame.classList.remove('close');
  });

  //skill 더블클릭 이벤트
  const skillIcon = document.querySelector('.my-skill-icon');

  skillIcon.addEventListener('dblclick', function(){
    const skillWindowFrame = document.querySelector('.skills-window-frame');
    skillWindowFrame.classList.remove('close');
  });

  //project 더블클릭 이벤트
  const projectIcon = document.querySelector('.my-project-icon');

  projectIcon.addEventListener('dblclick', function(){
    const projectWindowFrame = document.querySelector('.project-folder-window-frame');
    projectWindowFrame.classList.remove('close');
  });
});

//##########fetch(windowFrameBtn.html)##########//
fetch("html/windowFrameBtn.html")
.then(response => response.text())
.then(data => {
  document.querySelectorAll('#titlebar-button-wrap').forEach(function(titlebar){
    titlebar.innerHTML = data;
});

//##########fetch(taskbar.html)##########//
fetch("html/taskbar.html")
.then(response => response.text())
.then(data => {
  document.querySelector('.taskbar-container').innerHTML = data;

  //클릭이벤트
  const clickedBtns = document.querySelectorAll('.button-event');
  
  clickedBtns.forEach(function(clickedBtn){
    clickedBtn.addEventListener('mousedown', function(){
      clickedBtn.classList.add('clicked');
    });
    clickedBtn.addEventListener('mouseup', function(){
      clickedBtn.classList.remove('clicked');
    });
  });

  //현재시간
  function currentTime(){
    let today = new Date();
    let currentHours = today.getHours();
    let currentMinutes = today.getMinutes();
    let trayClock = document.getElementById('tray-clock');

    let formattedHours = (currentHours > 12 ? currentHours - 12 : currentHours).toString().padStart(2, "0");
    let formattedMinutes = currentMinutes.toString().padStart(2, "0");
  
    if (currentHours >= 12) {
      trayClock.innerText = `오후 ${formattedHours}:${formattedMinutes}`;
    } else {
      trayClock.innerText = `오전 ${formattedHours}:${formattedMinutes}`;
    }
  };

  currentTime();
  setInterval(currentTime, 1000);
  
  //titlebar, icon 버튼

  //skills-frame
  const skillsFrame = document.querySelector('.skills-window-frame');
  const skillBar = document.querySelector(".skill-button");
  const skillsIcon = document.querySelector('.my-skill-icon');

  const skillsMinimizeBtn = skillsFrame.querySelector('.window-minimize-btn');
  const skillsCloseBtn = skillsFrame.querySelector('.window-close-btn');

  skillsMinimizeBtn.addEventListener('click', function(){
    skillBar.classList.remove('active');
  });

  skillsCloseBtn.addEventListener('click', function(){
    skillBar.classList.add('hidden');
  });

  skillsIcon.addEventListener('dblclick', function(){
    skillBar.classList.remove('hidden');
  });

  skillBar.addEventListener('click', function(){
    if(skillBar.classList.contains('active')){
      skillBar.classList.remove('active');
      skillsFrame.classList.add('minimize');
    }else{
      skillBar.classList.add('active');
      skillsFrame.classList.remove('minimize');
    };
  });

  //profile-frame
  const profileFrame = document.querySelector('.profile-window-frame');
  const profileBar = document.querySelector('.profile-button');
  const profileIcon = document.querySelector('.my-profile-icon');

  const profileMinimizeBtn = profileFrame.querySelector('.window-minimize-btn');
  const profileCloseBtn = profileFrame.querySelector('.window-close-btn');

  profileMinimizeBtn.addEventListener('click', function(){
    profileBar.classList.remove('active');
  });

  profileCloseBtn.addEventListener('click', function(){
    profileBar.classList.add('hidden');
  });

  profileIcon.addEventListener('dblclick', function(){
    profileBar.classList.remove('hidden');
  });

  profileBar.addEventListener('click', function(){
    if(profileBar.classList.contains('active')){
      profileBar.classList.remove('active');
      profileFrame.classList.add('minimize');
    }else{
      profileBar.classList.add('active');
      profileFrame.classList.remove('minimize');
    };
  });

    //project-frame
    const projectFrame = document.querySelector('.project-folder-window-frame');
    const projectBar = document.querySelector('.project-button');
    const projectIcon = document.querySelector('.my-project-icon');
  
    const projectMinimizeBtn = projectFrame.querySelector('.window-minimize-btn');
    const projectCloseBtn = projectFrame.querySelector('.window-close-btn');
  
    projectMinimizeBtn.addEventListener('click', function(){
      projectBar.classList.remove('active');
    });
  
    projectCloseBtn.addEventListener('click', function(){
      projectBar.classList.add('hidden');
    });
  
    projectIcon.addEventListener('dblclick', function(){
      projectBar.classList.remove('hidden');
    });
  
    projectBar.addEventListener('click', function(){
      if(projectBar.classList.contains('active')){
        projectBar.classList.remove('active');
        projectFrame.classList.add('minimize');
      }else{
        projectBar.classList.add('active');
        projectFrame.classList.remove('minimize');
      };
    });

  //project-frame 01
  const projectOneFrame = document.querySelector('.window-frame_01');
  const projectOneBar = document.querySelector('.project-one-button');

  
  const projectOneMinimizeBtn = projectOneFrame.querySelector('.window-minimize-btn');
  const projectOneCloseBtn = projectOneFrame.querySelector('.window-close-btn');

  const projectOneSkillFrame = document.querySelector('.skills-window-frame_01');

  const projectOneSkillMinimizeBtn = projectOneSkillFrame.querySelector('.window-minimize-btn');
  const projectOneSkillCloseBtn = projectOneSkillFrame.querySelector('.window-close-btn');

  projectOneMinimizeBtn.addEventListener('click', function(){
    projectOneBar.classList.remove('active');
    projectOneSkillFrame.classList.add('minimize');
  });

  projectOneSkillMinimizeBtn.addEventListener('click', function(){
    projectOneBar.classList.remove('active');
    projectOneFrame.classList.add('minimize');
  });

  projectOneCloseBtn.addEventListener('click', function(){
    projectOneBar.classList.add('hidden');
    projectOneSkillFrame.classList.add('close');
  });

  projectOneSkillCloseBtn.addEventListener('click', function(){
    projectOneBar.classList.add('hidden');
    projectOneFrame.classList.add('close');
  });



  projectOneBar.addEventListener('click', function(){
    if(projectOneBar.classList.contains('active')){
      projectOneBar.classList.remove('active');
      projectOneFrame.classList.add('minimize');
      projectOneSkillFrame.classList.add('minimize');
    }else{
      projectOneBar.classList.add('active');
      projectOneFrame.classList.remove('minimize');
      projectOneSkillFrame.classList.remove('minimize');
    };
  });

  //project-frame 02
  const projectTwoFrame = document.querySelector('.window-frame_02');
  const projectTwoBar = document.querySelector('.project-two-button');

  
  const projectTwoMinimizeBtn = projectTwoFrame.querySelector('.window-minimize-btn');
  const projectTwoCloseBtn = projectTwoFrame.querySelector('.window-close-btn');

  const projectTwoSkillFrame = document.querySelector('.skills-window-frame_02');

  const projectTwoSkillMinimizeBtn = projectTwoSkillFrame.querySelector('.window-minimize-btn');
  const projectTwoSkillCloseBtn = projectTwoSkillFrame.querySelector('.window-close-btn');

  projectTwoMinimizeBtn.addEventListener('click', function(){
    projectTwoBar.classList.remove('active');
    projectTwoSkillFrame.classList.add('minimize');
  });

  projectTwoSkillMinimizeBtn.addEventListener('click', function(){
    projectTwoBar.classList.remove('active');
    projectTwoFrame.classList.add('minimize');
  });

  projectTwoCloseBtn.addEventListener('click', function(){
    projectTwoBar.classList.add('hidden');
    projectTwoSkillFrame.classList.add('close');
  });

  projectTwoSkillCloseBtn.addEventListener('click', function(){
    projectTwoBar.classList.add('hidden');
    projectTwoFrame.classList.add('close');
  });

  

  projectTwoBar.addEventListener('click', function(){
    if(projectTwoBar.classList.contains('active')){
      projectTwoBar.classList.remove('active');
      projectTwoFrame.classList.add('minimize');
      projectTwoSkillFrame.classList.add('minimize');
    }else{
      projectTwoBar.classList.add('active');
      projectTwoFrame.classList.remove('minimize');
      projectTwoSkillFrame.classList.remove('minimize');
    };
  });

//project-frame 03
const projectThreeFrame = document.querySelector('.window-frame_03');
const projectThreeBar = document.querySelector('.project-three-button');


const projectThreeMinimizeBtn = projectThreeFrame.querySelector('.window-minimize-btn');
const projectThreeCloseBtn = projectThreeFrame.querySelector('.window-close-btn');

const projectThreeSkillFrame = document.querySelector('.skills-window-frame_03');

const projectThreeSkillMinimizeBtn = projectTwoSkillFrame.querySelector('.window-minimize-btn');
const projectThreeSkillCloseBtn = projectTwoSkillFrame.querySelector('.window-close-btn');

projectThreeMinimizeBtn.addEventListener('click', function(){
  projectThreeBar.classList.remove('active');
  projectThreeSkillFrame.classList.add('minimize');
});

projectThreeSkillMinimizeBtn.addEventListener('click', function(){
  projectThreeBar.classList.remove('active');
  projectThreeFrame.classList.add('minimize');
});

projectThreeCloseBtn.addEventListener('click', function(){
  projectThreeBar.classList.add('hidden');
  projectThreeSkillFrame.classList.add('close');
});

projectThreeSkillCloseBtn.addEventListener('click', function(){
  projectThreeBar.classList.add('hidden');
  projectThreeFrame.classList.add('close');
});



projectThreeBar.addEventListener('click', function(){
  if(projectThreeBar.classList.contains('active')){
    projectThreeBar.classList.remove('active');
    projectThreeFrame.classList.add('minimize');
    projectThreeSkillFrame.classList.add('minimize');
  }else{
    projectThreeBar.classList.add('active');
    projectThreeFrame.classList.remove('minimize');
    projectThreeSkillFrame.classList.remove('minimize');
  };
});

  //start-menu
  const startBtn = document.querySelector('.start-button');
  const startMenu = document.querySelector('.start-menu');
  console.log(startBtn, startMenu)

  startBtn.addEventListener('click', function(){
    if(startMenu.classList.contains('active')){
      startMenu.classList.remove('active')
    }else{
      startMenu.classList.add('active')
    };
  });

  const restartBtn = startMenu.querySelector('.restart-btn');
  const shutdownBtn = startMenu.querySelector('.shutdown-btn');

  restartBtn.addEventListener('click', function(){
    window.location.reload();
  });

  shutdownBtn.addEventListener('click', function(){
    window.location.replace('../html/shutdown.html')
  });
});

  //마우스 클릭 이벤트
  let titlebarBtns = document.querySelectorAll('#titlebar-btn');

  titlebarBtns.forEach(function(titlebarBtn){
    titlebarBtn.addEventListener('mousedown', function(){
      titlebarBtn.classList.add('clicked');
    });
    titlebarBtn.addEventListener('mouseup', function(){
      titlebarBtn.classList.remove('clicked');
    })
  });

  //minimize 버튼 클릭 이벤트
  const windowFrame = document.querySelectorAll('.window-frame');

  windowFrame.forEach(function(frame){
    const minimizeBtn = frame.querySelector('.window-minimize-btn');
    minimizeBtn.addEventListener('click', function(){
      frame.classList.add('minimize');
    });
  });

  //resize 버튼 클릭 이벤트
  windowFrame.forEach(function(frame){
    const resizeBtn = frame.querySelector('.window-resize-btn');
    resizeBtn.addEventListener('click', function(){
      if(!frame.classList.contains('resize')){
        frame.classList.add('resize');
        frame.style.transform = 'translate(0, 0)';
        resizeBtn.querySelector('img').src = 'images/window-resize-icon_0.png';
      }else{
        frame.classList.remove('resize');
        resizeBtn.querySelector('img').src = 'images/window-resize-icon.png';
      }
    });
  });

  //close 벝버튼 클릭 이벤트
  windowFrame.forEach(function(frame){
    const closeBtn = frame.querySelector('.window-close-btn');
    closeBtn.addEventListener('click', function(){
      frame.classList.add('close');
      if(frame.classList.contains('resize')){
        frame.classList.remove('resize');
      };
    });
  });

  //##########titlebar-dblclick##########//
  windowFrame.forEach((frame) => {
    const titleBar = frame.querySelector('.window-titlebar');
    const resizeBtn = frame.querySelector('.window-resize-btn');

    titleBar.addEventListener('dblclick', function(){
      if(frame.classList.contains('resize')){
        frame.classList.remove('resize');document.getElementById('win98-dock').style.display = 'flex';
        resizeBtn.querySelector('img').src = 'images/window-resize-icon.png';
      }else{
        frame.classList.add('resize');
        frame.style.transform = 'translate(0, 0)';
        resizeBtn.querySelector('img').src = 'images/window-resize-icon_0.png';
      };
    });
  });
});


//##########인트로 텍스트 애니메이션##########
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('lock-scroll'); // 스크롤 잠금

  let text = [
    "안녕하세요!",
    "저는 효율성과 디테일을 사랑하는",
    "프론트엔드 개발자 정소연입니다.",
    "Welcome to My portfolio"
  ];
  let textArea = document.querySelector('#typing');
  let currentIndex = 0;
  let textIndex = 0;

  // 커서
  let textCursor = document.createElement('span');
  textCursor.classList.add('text-cursor');
  textArea.appendChild(textCursor);

  function textEffect() {
    let current = text[currentIndex];
    textArea.innerHTML = current.slice(0, textIndex + 1);
    textArea.appendChild(textCursor);
    textIndex++;

    if (textIndex === current.length) {
      setTimeout(function () {
        textIndex = 0;
        currentIndex++;

        if (currentIndex < text.length) {
          textEffect();
        } else {
          setTimeout(() => {
            fullpage_api.moveSectionDown(); // 다음 섹션으로 이동
            document.body.classList.remove('lock-scroll'); // 스크롤 잠금 해제
          }, 1000);
        }
      }, 1000);
    } else {
      setTimeout(textEffect, 200);
    }
  }

  setTimeout(textEffect, 1000); // 초기 딜레이 후 텍스트 시작
});



//##########section02##########//
let skillTaps = document.querySelectorAll('.skill-tap');

skillTaps.forEach(function(skillTap){
  let skillTapBtn = skillTap.querySelector('.skill-tap-title');
  skillTapBtn.addEventListener('click', function(){
    skillTaps.forEach(function(tap){
      tap.classList.remove('active')
    });
    skillTap.classList.add('active')
  });
});

let clickWindowFrame = document.querySelectorAll('.window-frame');

clickWindowFrame.forEach(function(frame){
  frame.addEventListener('mousedown', function(){
    clickWindowFrame.forEach(function(windowFrame){
      windowFrame.style.zIndex = '0';
    });
    frame.style.zIndex = '99999999';
  });
});



let profileTaps = document.querySelectorAll('.profile-tap');

profileTaps.forEach(function(profileTap){
  let profileTapBtn = profileTap.querySelector('.profile-tap-title');
  profileTapBtn.addEventListener('click', function(){
    profileTaps.forEach(function(tap){
      tap.classList.remove('active')
    });
    profileTap.classList.add('active');
  });
});

//폴더
const projectFolderIcon = document.querySelectorAll('.folder-icon');
const folderContent = document.querySelectorAll('.folder-content');

projectFolderIcon.forEach(function(icon){
  icon.addEventListener('dblclick', function(){
    folderContent.forEach(function(folder){
      folder.classList.remove('active');
    });
    document.getElementById(icon.dataset.folder).classList.add('active');
  });
});

const upFolderIcon = document.querySelectorAll('.up-folder-icon');

upFolderIcon.forEach(function(up){
  up.addEventListener('dblclick', function(){
    folderContent.forEach(function(folder){
      folder.classList.remove('active');
    });
    document.querySelector('.root-folder').classList.add('active');
  });
});

const projectIcon = document.querySelectorAll('.project-icon');
const projectFrame = document.querySelector('.project-folder-window-frame');
const skillsFrame = document.querySelector('.skills-window-frame');
const profileFrame = document.querySelector('.profile-window-frame');
const taskbarContainer = document.querySelector('.taskbar-container');

projectIcon.forEach(function(icon){
  icon.addEventListener('dblclick', function(){
    document.getElementById(icon.dataset.project).classList.remove('close');
    document.getElementById(icon.dataset.skill).classList.remove('close');
    document.getElementById(icon.dataset.bar).classList.remove('hidden');

    if(!document.getElementById(icon.dataset.project).classList.contains('close')){
      document.getElementById(icon.dataset.project).style.zIndex = 0;
      document.getElementById(icon.dataset.skill).style.zIndex = 0;
    }
    document.getElementById(icon.dataset.project).style.zIndex = '999999999';
    document.getElementById(icon.dataset.skill).style.zIndex = '999999999';
    projectFrame.style.zIndex = 0;
    skillsFrame.classList.add('minimize');
    profileFrame.classList.add('minimize');

    const profileTaskbar = taskbarContainer.querySelector('.profile-button');
    const skillTaskbar = taskbarContainer.querySelector('.skill-button');
    profileTaskbar.classList.remove('active');
    skillTaskbar.classList.remove('active');
  });
});

const miniProjectIcon = document.querySelectorAll('.mini-icon');
const subProjectIcon = document.querySelectorAll('.sub-icon');

miniProjectIcon.forEach(function(mini){
  mini.addEventListener('dblclick', function(){
    window.open(`https://soyeon1962.github.io/mini-project-0${mini.dataset.link}/`, '_blank');
  });
});

subProjectIcon.forEach(function(sub){
  sub.addEventListener('dblclick', function(){
    if(sub.dataset.link <= 1){
      window.open(`https://soyeon1962.github.io/sub-project-0${sub.dataset.link}/`, '_blank');
    }else{
      window.open(`https://sub-project-0${sub.dataset.link}.netlify.app/`, '_blank');
    };
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const iframeBox = document.querySelector(".iframe-box");
  const scrollUpBtn = document.querySelector(".scroll-up-btn");
  const scrollDownBtn = document.querySelector(".scroll-down-btn");

  // 스크롤 이동량
  const scrollStep = 100;
  let scrollInterval;

  scrollUpBtn.addEventListener("click", () => {
    iframeBox.scrollBy({ top: -scrollStep, behavior: "smooth" });
  });

  scrollDownBtn.addEventListener("click", () => {
    iframeBox.scrollBy({ top: scrollStep, behavior: "smooth" });
  });
  
  scrollUpBtn.addEventListener("mousedown", () => {
    scrollInterval = setInterval(() => {
      iframeBox.scrollBy({ top: -scrollStep, behavior: "smooth" });
    }, 100);
  });

  scrollDownBtn.addEventListener("mousedown", () => {
    scrollInterval = setInterval(() => {
      iframeBox.scrollBy({ top: scrollStep, behavior: "smooth" });
    }, 100);
  });

  scrollUpBtn.addEventListener("mouseup", () => {
    clearInterval(scrollInterval);
  });

  scrollDownBtn.addEventListener("mouseup", () => {
    clearInterval(scrollInterval);
  });

  scrollUpBtn.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });

  scrollDownBtn.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });

  let scrollBtns = document.querySelectorAll('.scroll-btn');

  scrollBtns.forEach(function(scrollBtn){
    scrollBtn.addEventListener('mousedown', function(){
      scrollBtn.classList.add('clicked');
    });
    scrollBtn.addEventListener('mouseup', function(){
      scrollBtn.classList.remove('clicked')
    });
  });
});