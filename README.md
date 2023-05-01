[![CI](https://github.com/PuddyProject/Puddy_FrontEnd/actions/workflows/main.yml/badge.svg)](https://github.com/PuddyProject/Puddy_FrontEnd/actions/workflows/main.yml)


# 💙 PUDDY : FRONTEND

**반려견에 대한 다양한 질문과 응답을 공유하는 커뮤니티 서비스** <br/>

![puddy_readme_02](https://user-images.githubusercontent.com/48672106/232711387-cacdfc70-685b-466c-bebf-9621912881e4.png)

[PUDDY 서비스 바로가기](http://puddy.shop.s3-website.ap-northeast-2.amazonaws.com/) <br/>
> 현재 360*740에 최적화되어있습니다. (갤럭시S8+)

<br/>

## 프로젝트 개요

 **퍼디**는 **Pet + Buddy**의 합성어로 <br/>
반려견을 자신의 가족, 친구와 같이 생각한다는 의미에서 네이밍되었습니다. <br/>

반려견을 키우는 주인이 **서로 정보를 교환하고,** <br/>
**경험을 공유하며 도움을 주고받을 수 있는 플랫폼**입니다. <br/>
<br/>

## 기술 스택
**FrontEnd.**

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-round&logo=React&logoColor=white"/>  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-round&logo=TypeScript&logoColor=white"/>  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-round&logo=Sass&logoColor=white"/> <img  src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-round&logo=PWA&logoColor=white"/>     
<img  src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-round&logo=reactrouter&logoColor=white"/>   <img  src="https://img.shields.io/badge/axios-5A29E4?style=flat-round&logo=axios&logoColor=white"/>   
<img  src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-round&logo=Amazon S3&logoColor=white"/>

<br/>

## 코드/커밋 컨벤션

[프론트엔드 컨벤션](https://bramble-quotation-760.notion.site/122bb7b6d582429190447b8df94d0b1b)

<br/>

## 폴더 구조
```
├─assets
│  └─login
├─components
│  ├─common
│  ├─main
│  ├─qnaDetail
│  └─signup
├─constants
├─context
├─fonts
├─hooks
├─layouts
├─pages
│  ├─AuthExpert
│  ├─Bookmark
│  ├─CardDetail
│  ├─CardList
│  ├─CardSearch
│  ├─CommentAnswer
│  ├─ExpertCardList
│  ├─ExpertProfile
│  ├─ExpertProfileEditor
│  ├─FindAccount
│  ├─Login
│  ├─Main
│  ├─MyActivityInfo
│  ├─MyPage
│  ├─MyProfileEditor
│  ├─NewPost
│  ├─NotFound
│  ├─Notification
│  ├─PetProfile
│  ├─PetProfileEditor
│  ├─Review
│  └─Signup
├─routes
├─styles
│  ├─abstracts
│  ├─base
│  ├─components
│  ├─layout
│  │  ├─footer
│  │  └─header
│  └─pages
├─types
└─utils
    ├─initialValues
    └─validate
```

<br/>

## Preview

> ### 로그인
회원가입한 사용자의 경우 <br/>
로그인이 성공하면 메인페이지로 이동됩니다. <br/>

![Honeycam 2023-04-20 21-18-36](https://user-images.githubusercontent.com/48672106/233363678-d9fd75bd-7889-451c-b248-ae6939923ce9.gif)

<br/>

> ### 회원가입

사용자가 필수 입력 값을 입력하지 않으면 <br/>
해당 인풋 박스가 흔들리는 `인터랙션`을 적용하였습니다. <br/>
정규식을 통해 유효한 아이디, 비밀번호, 이름, 이메일을 확인하며, <br/>
아이디와 이메일은 중복검사를 하도록 구현하였습니다. <br/>

![Honeycam 2023-04-20 21-08-31](https://user-images.githubusercontent.com/48672106/233361555-c7bf109c-6260-42e1-9b78-7637ae8303a3.gif)

<br/>

>### 메인 페이지

상단 캐러셀을 통해 광고와 같은 배너를 삽입할 수 있도록 구현하였습니다.<br/>
인기 Q&A, 최신 Q&A, 퍼디 신규 전문가, 커뮤니티 HOT, 커뮤니티 NEW 정보를 확인 할 수 있습니다.<br/>


https://user-images.githubusercontent.com/62174495/233632125-c1fd1796-4b3c-4706-9bee-25eaad3b7cde.mp4

<br/>


>### Q&A 및 커뮤니티 목록 페이지

Q&A 질문 글을 무한 스크롤로 구현했습니다.<br/>
더 이상 가져상 가져올 데이터가 없는 경우 마지막 페이지임을 알리는 문구를 표시합니다.<br/>
정렬 기능을 통해 최신순, 오래된 순, 인기 순으로 게시글을 확인할 수 있습니다.<br/>


https://user-images.githubusercontent.com/62174495/233632187-772fd249-f792-49ab-91a1-06558b79318c.mp4

<br/>

>### Q&A 및 커뮤니티 글쓰기

Q&A와 커뮤니티 글 CRUD를 구현하였습니다.<br/>

https://user-images.githubusercontent.com/62174495/233632362-0fc15ae3-cc4b-4d40-a186-7865f3882be0.mp4

<br/>

>### Q&A 상세페이지

본인이 작성한 Q&A글에는 답변 작성은 불가하며, 다른 사용자가 남긴 답변만 채택할 수 있습니다.<br/>
하나의 Q&A글에는 하나의 답변만 등록할 수 있습니다.<br/>
채택된 답변은 가장 최상단에 노출됩니다.<br/>
일반 사용자가 아닌, 전문가 사용자의 리뷰를 채택할 경우 리뷰 작성이 가능합니다.<br/>
채택된 답변은 삭제 및 수정이 불가능합니다. <br/>


https://user-images.githubusercontent.com/62174495/233632513-4b2c330d-e15f-4576-a8d6-beb261868ff3.mp4

<br/>

>### 커뮤니티 상세페이지

작성된 게시글을 확인할 수 있으며, <br/>
댓글을 작성할 수 있습니다.<br/>


https://user-images.githubusercontent.com/62174495/233632659-e3f539db-d54e-47c1-a56f-10a04db11d5b.mp4

<br/>

>### Q&A 및 커뮤니티 검색 페이지

Q&A와 커뮤니티를 제목 기준으로 검색할 수 있습니다. <br/>

https://user-images.githubusercontent.com/62174495/233632861-bc20d42f-7aea-4773-b871-01d29d04092a.mp4

<br/>

>### 마이페이지

내 프로필 수정, 내 펫 등록, 비밀번호 변경/계정 로그아웃 등이 가능한 페이지입니다. <br/> 


![Honeycam 2023-05-02 08-12-20](https://user-images.githubusercontent.com/48672106/235547185-1e0eab79-8a3f-47ea-8a87-7a477a3bbfa2.gif)

<br/>

>### 펫 등록&수정
펫 프로필 등록, 수정을 할 수 있습니다. <br/>
작성한 프로필은 Q&A 게시글 등록 후 게시글 내 태그 형태로 나타납니다. <br/>

![Honeycam 2023-05-02 08-17-27](https://user-images.githubusercontent.com/48672106/235547992-bbb677b9-0378-4432-9466-93b87d98797d.gif)

![Honeycam 2023-05-02 08-17-56](https://user-images.githubusercontent.com/48672106/235548003-6505ef21-3815-4ff4-bfb9-ceab852ce1de.gif)

<br/>

> ### 내 프로필 등록&수정

닉네임과 프로필 사진을 등록/변경할 수 있습니다. <br/>
'퍼디'로 시작하는 닉네임은 가입 시 자동으로 부여하고 있으므로 '퍼디'로 시작되는 닉네임은 사용할 수 없습니다. <br/>
닉네임 유효성 검사와 프로필 사진 확장자를 제한하고 있습니다. <br/>

![Honeycam 2023-05-02 08-18-24](https://user-images.githubusercontent.com/48672106/235548129-7e82e801-b624-4625-9a29-4794eb735146.gif)


<br/>

> ### 전문가 서류 제출

현재는 어드민 페이지가 존재하지 않아 테스트를 위해 서류 제출 시 바로 권한을 부여하도록 해놓았습니다. <br/>

![Honeycam 2023-05-02 08-18-51](https://user-images.githubusercontent.com/48672106/235548336-415d39ca-131b-4ca6-81c6-50747b12d99a.gif)


<br/>

> ### 전문가 프로필

마이페이지에서 전문가 프로필 작성 시 전문가 프로필을 확인할 수 있는 페이지입니다. <br/>
본인의 프로필인 경우에만 '수정하기' 버튼이 노출됩니다. <br/>

![Honeycam 2023-05-02 08-20-31](https://user-images.githubusercontent.com/48672106/235548357-d55a415b-2162-4314-a8b7-1efd6b637ae0.gif)


<br/>

## Figma 

![image](https://user-images.githubusercontent.com/48672106/233358337-401d47e1-b026-43b5-9e4b-bdc24407750a.png)


<br/>

## 프로젝트 멤버
| Back. | Front. | Front. |
|:---:|:---:|:---:|
| ![전상준](https://avatars.githubusercontent.com/u/93868431?v=4) | ![이유](https://avatars.githubusercontent.com/u/48672106?v=4) |![홍주완](https://avatars.githubusercontent.com/u/62174495?v=4) |
| [**전상준**](https://github.com/waveofmymind) | [**이유**](https://github.com/ReturnReason) | [**홍주완**](https://github.com/vjvl95) |
| 💎 팀원  | 👑 팀장 | 💎 팀원 |

<br/>

## 회고&이슈
[사이드 프로젝트 회고 - 팀 빌딩부터 기획까지](https://reasonz.tistory.com/51) <br/>
[JWT 리프레시 토큰 도대체 언제, 어떻게 쓰는거지?](https://reasonz.tistory.com/58) <br/>
[세션스토리지에서 토큰을 강제 삭제 한다면?](https://reasonz.tistory.com/52) <br/>
[리액트 서스펜스(Suspense) 사용기](https://reasonz.tistory.com/55) <br/>
[도전 클린코드! API endpoint, routes Path 상수로 바꾸기](https://reasonz.tistory.com/56) <br/>
[인풋 인터랙션 적용시켜보기](https://reasonz.tistory.com/47) <br/>
[웹 접근성에 대해 고민해보고 적용해보기 - tabindex](https://reasonz.tistory.com/42) <br/>
[사이드 프로젝트 개발 마무리 회고](https://reasonz.tistory.com/62)<br/>
[UX/UI 개선 및 반응형 작업하기](https://reasonz.tistory.com/68)<br/>

<br/>

## 미해결 이슈&개선 가능 사항

**1. 소셜 로그인(카카오) 오류**<br/> 
사용자가 소셜 로그인(카카오) 진행 시 카카오 로그인 전 페이지를 이탈할 경우 에러가 발생합니다.

**2. PWA** <br/>
PWA로 환경을 구성했으나, 백엔드 서버가 현재 https로 구성되어있지 않아 반영하지 못했습니다. <br/>

**3. 코드의 중복과 매직 넘버가 존재합니다.** <br/>
재사용이 가능한 코드와 클린코드를 위한 리팩토링 과정이 필요합니다. <br/>

**4. 어드민 페이지와 관련 API의 부재로 현재는 전문가 서류 제출 시 자동으로 사용자의 권한을 변경하고 있습니다.**<br/>
어드민 페이지를 통해 제출한 서류를 검토 후 사용자의 권한을 변경하는 로직이 필요합니다. <br/>

**5. 반응형 작업** <br/>
현재는 모바일(갤럭시 S8+)에 최적화되어있습니다. </br>

**6. form 인터랙션 통일** <br/>
일부 페이지는 shake 애니메이션 인터랙션으로 required 인풋 값이 비어져있는 것을 확인할 수 있도록 하는 반면, <br/>
일부 페이지는 버튼의 활성화, 비활성화 형식으로 form이 구성되어있습니다. <br/>
따라서 form 제출의 인터랙션이 통일되도록 수정해야합니다.

**7. 리프레시 토큰** <br/>
서버로부터 리프레시 토큰을 받고 있으나, <br/>
기술적인 이슈로 액세스 토큰이 만료되었을 때 리프레시 토큰을 사용하는 로직이 구현되어있지 않습니다. <br/>

**8. UX/UI 개선** <br/>
모바일 환경을 고려하지 못한 UX/UI 개선이 필요합니다. <br/>

<br/>

## [PUDDY 프로젝트 문서(노션)](https://www.notion.so/puddy/PUDDY-cbab6d6425cd4103b9461eff301ca7e5)

<br/>

![puddy_readme_03](https://user-images.githubusercontent.com/48672106/234379509-17a79b95-fc0a-45a5-a911-409e684ad59a.png)

