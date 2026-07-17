/*
 * study-data.js — PUBLIC study layer for the topic cards.
 *
 * This file IS committed (unlike the old private-data.js). It holds the
 * "Grok × Claude" study notes shown under each card: general, searchable
 * business/industry knowledge — no personal information, no third parties, no
 * identifying details. index.html reads window.MENTORING_STUDY and renders a
 * two-pane block (Grok = the lesson; Claude = follow-up + sources) per card id.
 *
 * Anything personal or sensitive (personal plans, blunt characterizations, a
 * named-company anecdote) deliberately lives ONLY in the git-ignored private/
 * folder as markdown — never here, never on the public page.
 *
 * Shape:  window.MENTORING_STUDY = { <cardId>: { grok, claude, sources }, ... }
 *   grok    — HTML string (the transferable lesson)
 *   claude  — HTML string (follow-up mentoring at my level)
 *   sources — [{label,url}] rendered as a link row under the Claude pane
 */
window.MENTORING_STUDY = {

  networking: {
    grok:
      "<ul>" +
      "<li>창발 같은 모임은 대부분 <b>F-1·학생 비자로 미국 정착을 노리는 사람들</b> 중심. 이미 자리 잡은 미국인은 굳이 안 온다.</li>" +
      "<li>한국 기업(네이버·쿠팡 등)은 이런 자리에서 <b>이미 아마존·MS에 있는 사람</b>을 뽑는다 — 미국 사정을 아는 '교두보'로 쓰려는 것.</li>" +
      "<li>미국 채용의 <b>70~80%가 리퍼럴</b>. 메커니즘: 한 팀에서 잘함 → 더 좋은 조건으로 이직 → 나중에 옛 동료가 승진해 <b>다시 불러준다</b>. 링크드인은 그 끊긴 선을 다시 잇는 도구.</li>" +
      "<li>이건 우정이 아니라 <b>프로페셔널 인맥</b>이다. 레퍼런스 체크(전 상사·동료 ~3명)가 다음 채용으로 이어진다.</li>" +
      "<li>결론: 어느 회사를 가든 <b>늘 최선을 다하고</b>, 링크드인 연결을 끊지 마라.</li>" +
      "</ul>",
    claude:
      "<p>핵심은 <b>약한 연결(weak ties)</b> — 친한 친구가 아니라 '느슨하게 아는 사람'이 새 기회를 물어온다(Granovetter). " +
      "너는 이미 <b>build-in-public</b> 하는 사람이니, Physical Spark 진행을 링크드인·깃허브에 꾸준히 남기면 그 자체가 약한 연결을 부른다. " +
      "커피챗은 '일자리 부탁'이 아니라 <b>'내가 만든 것 공유'</b>로 시작하라 — 그게 newcomer가 이용당하지 않고 도움을 받는 법.</p>",
    sources: [
      { label: "약한 연결 (Granovetter)", url: "https://en.wikipedia.org/wiki/Interpersonal_ties" },
    ],
  },

  saas: {
    grok:
      "<ul>" +
      "<li>'죽었다'기보다 <b>축소 + 투자가 안 되는</b> 것. VC가 애들한테 ~10만 달러 줘서 앱 만들어 MS·아마존에 파는 <b>'플립' 모델이 끝났다</b>.</li>" +
      "<li>세일즈포스처럼 기존 SaaS는 <b>AI를 붙여 계속 살아남는다</b>. 소프트웨어를 '짓는 것' 자체가 죽은 건 아니다.</li>" +
      "</ul>",
    claude:
      "<p>정확히 죽은 건 <b>'seat당 과금 + 빠른 플립'</b> 모델이다(나델라의 리프라이싱: seat → usage·outcome). " +
      "살아남는 건 <b>자체 데이터·깊은 워크플로·유통·물리 해자</b>를 가진 것. " +
      "너처럼 에이전트를 오케스트레이션하고 human-in-the-loop로 책임지는 FDE는 'seat'가 아니라 <b>'성과'로 값이 매겨지는 쪽</b>에 서 있다 — 리프라이싱의 수혜 위치.</p>",
    sources: [
      { label: "IDC: Is SaaS dead?", url: "https://www.idc.com/resource-center/blog/is-saas-dead-rethinking-the-future-of-software-in-the-age-of-ai/" },
    ],
  },

  neo: {
    grok:
      "<ul>" +
      "<li>다관절 정교한 손은 <b>엄청 비싸고 살 사람이 없다</b>. 진짜 공장·대체용 로봇은 <b>단순한 일</b>을 하므로 손이 그렇게 복잡할 필요가 없다.</li>" +
      "<li>화려한 손을 만드는 건 팔려는 게 아니라 <b>'최초'를 증명해 VC 돈을 받고 회사를 팔기 위한 것</b>.</li>" +
      "<li>보스턴다이내믹스를 현대가 산 건 <b>현명</b>했다 — 그 기술이 없었으니까. 삼성도 지금 투자 중.</li>" +
      "</ul>",
    claude:
      "<p>데모의 '자연스러움'과 '자율성'은 다르다 — 2026 최상위 정책모델도 상당 부분 <b>teleop(원격조종) 데이터로 학습</b>한다. " +
      "너의 커리큘럼(SO-101 pick&place)이 <b>'단순 작업의 신뢰성'</b>에 집중하는 건 시장과 정확히 맞다. " +
      "핵심은 화려한 손이 아니라 <b>'되는 단순함'</b>과 그걸 만드는 데이터·정책(policy)이다.</p>",
    sources: [
      { label: "Robot Report: teleop, not autonomy", url: "https://www.therobotreport.com/teleop-not-autonomy-the-path-for-1x-neo-humanoid/" },
      { label: "Physical Intelligence π0 (VLA)", url: "https://www.pi.website/blog/pi0" },
    ],
  },

  drones: {
    grok:
      "<ul>" +
      "<li>국방은 <b>'지금 필요한 것'</b>에 돈을 쓴다. 드론 스웜이 오고, <b>레이저가 총알보다 싸다</b>는 비용 비대칭이 핵심.</li>" +
      "<li>가치는 하드웨어가 아니라 <b>'어떻게 탐지·조준하는가'</b> — 코딩·센서퓨전·레이더. 기술을 프라임(예: 록히드)에 파는 구조.</li>" +
      "<li>실제 드론 상대로 다 만들어 테스트하지 않는다 — <b>'가능성만 보여주면'</b> 투자·정부가 온다. <b>커머셜 각도</b>도 같이 둬야 회사 가치가 오른다.</li>" +
      "<li>대조: 오래전 '모기 잡는 레이저'는 기술은 대단했지만 <b>현실 수요가 없어</b> 안 팔렸다. 교훈은 언제나 <b>수요</b>.</li>" +
      "</ul>",
    claude:
      "<p>방산의 <b>perception·autonomy(센서퓨전, 표적 추적)</b>는 물건을 잡는 상업 로봇으로 그대로 전이된다. " +
      "다만 방산은 <b>시민권·클리어런스 벽</b>이 높아(네 J-1 상황과 충돌) 커리어 트랙으로는 어렵다 — <b>원리는 배우되 커리어는 상업 Physical AI</b>로. " +
      "해자는 레이저(하드웨어)가 아니라 <b>소프트웨어</b>라는 점을 기억.</p>",
    sources: [
      { label: "Al Jazeera: lasers vs drones", url: "https://www.aljazeera.com/economy/2026/2/14/are-lasers-the-future-of-anti-drone-warfare" },
    ],
  },

  "software-eaten": {
    grok:
      "<ul>" +
      "<li>OpenAI가 번역·상담·법률을 챗봇에 넣으면 그런 <b>wrapper 직종은 사라진다</b>. 리걸텍 하는 사람들도 불안해한다.</li>" +
      "<li>광고·마케팅 AI 에이전트 스타트업은 <b>누구나 하고 쉽게 카피</b>되며, <b>중국이 이미 다 하고 있다</b>. 미국에서 색달라 보일 뿐.</li>" +
      "<li>그나마 안전한 니치는 <b>Physical AI</b> — 단, 그것도 자체 문제(뒤 카드)를 안고 있다.</li>" +
      "</ul>",
    claude:
      "<p>흡수되는 건 <b>'얇은 wrapper'</b>다. 살아남는 건 자체 데이터·깊은 워크플로·유통·물리 해자를 가진 것. " +
      "네 강점(<b>오케스트레이션 + human-in-the-loop 거버넌스</b>)은 모델이 삼키기 어려운 <b>'워크플로·신뢰' 층</b>이다. " +
      "이게 물리(Physical)가 더 깊은 해자인 이유이기도 하다 — 모델이 아무리 커도 <b>세상을 직접 만질 순 없으니까</b>.</p>",
    sources: [
      { label: "TechCrunch: GPT-Live", url: "https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/" },
    ],
  },

  lidar: {
    grok:
      "<ul>" +
      "<li>RGB 카메라가 훨씬 많이 쓰인다 — <b>싸니까</b>. 근접(그래스핑)은 <b>색이 필요</b>해서 카메라가 유리하다.</li>" +
      "<li>라이다의 진짜 값: <b>3D를 컴퓨테이션 없이</b> 바로 얻는다.</li>" +
      "<li>미래엔 <b>카메라 옆에 라이다가 같이</b> 달린다 — 센서는 많을수록 좋다(리던던시: 하나 죽어도 하나 산다). <b>비용만이 제약</b>.</li>" +
      "<li>테슬라 FSD는 싸게 가려고 라이다를 뺐고, <b>방산은 정확성이 중요하고 돈을 안 아끼니</b> 다 붙인다.</li>" +
      "</ul>",
    claude:
      "<p><b>작업이 센서를 정한다.</b> 손(0.2~1m)엔 dense color+depth(RGB-D, 예: RealSense), 이동·다리엔 라이다. " +
      "커리큘럼이 <b>'손'</b>이면 camera-first가 맞다. 센서퓨전(라이다+카메라)은 이동 로봇으로 확장할 때의 다음 챕터로 남겨둬라.</p>",
    sources: [
      { label: "Orbbec: LiDAR vs RGB-D", url: "https://www.orbbec.com/blog/how-lidar-and-rgbd-cameras-compare-and-work-together/" },
      { label: "RGB-D 카메라 (개요)", url: "https://en.wikipedia.org/wiki/RGB-D_camera" },
    ],
  },

  worldview: {
    grok:
      "<ul>" +
      "<li>로보틱스 사람은 늘 <b>'리얼리티(실제로 도움이 되나)'</b>를 생각한다. 웹개발은 좁은 도메인 안에서 논다.</li>" +
      "<li><b>'Plug and Play'</b>: 네 아이디어를 액셀러레이터·경쟁 풀에 넣고 <b>남과 비교해 네 순위</b>('5등 안에 드나')를 알아야 한다. 안 그러면 우물 안에서 자기 위치를 모른다.</li>" +
      "<li>미국 VC는 <b>'최초·유니크한가'</b>로 판단한다 — 2등이면 돈 안 준다. 한국은 유니크함을 못 판단해 <b>'상(award)'</b>에 의존한다.</li>" +
      "<li>(동력) 많은 이민자 창업자는 <b>'증명하고 싶은 결핍'</b>이 엔진이다. 편하게 자란 사람은 잘 안 한다.</li>" +
      "</ul>",
    claude:
      "<p>로보틱스 렌즈 = <b>(1) 데모와 실제 능력 구분, (2) 비용·센서 트레이드오프, (3) '해자가 어디인가'를 늘 묻기</b>. " +
      "감을 잡는 법: 요약글 대신 <b>π0·GR00T 기술 블로그를 읽고 LeRobot 코드를 직접 돌려봐라</b> — 네 build-in-public 방식과 정확히 맞는 학습법이다.</p>",
    sources: [
      { label: "Physical Intelligence π0", url: "https://www.pi.website/blog/pi0" },
      { label: "NVIDIA Isaac GR00T", url: "https://developer.nvidia.com/isaac/gr00t" },
      { label: "LeRobot (Hugging Face)", url: "https://github.com/huggingface/lerobot" },
    ],
  },

  india: {
    grok:
      "<ul>" +
      "<li>MS는 이제 인도인이 압도적이다. 이유는 개인 능력이라기보다 <b>구조</b> — 그들은 미국 정착을 <b>인생 목표</b>로 삼고 밀어붙인다.</li>" +
      "<li>파이프라인이 명확하다: 미국 거주 목표 → <b>F-1</b> → 학사 있으니 <b>석사부터</b> → 석사 후 <b>H-1B</b> → <b>그린카드</b>. 그린카드 딴 뒤에야 창업한다.</li>" +
      "<li>강점은 <b>영어 + 강한 in-group 리퍼럴·멘토 네트워크</b> — 다음 세대를 끌어준다. H-1B의 <b>70%가 인도</b>.</li>" +
      "<li>교훈: 배울 건 <b>파이프라인 설계와 리퍼럴 문화</b>다.</li>" +
      "</ul>",
    claude:
      "<p>소프트웨어 정면승부는 그들의 영어·리퍼럴·재학 이점 때문에 불리하니, <b>인도 파이프라인이 약한 곳(Physical AI)</b>으로 비대칭 포지셔닝하라. " +
      "협업에선 누구의 산출물이든 <b>결과물 기준으로 검증</b>하는 습관 — 네 human-in-the-loop 검증 강점과 통하는, 앞으로 더 값나가는 자세다.</p>",
    sources: [
      { label: "H-1B visa (개요)", url: "https://en.wikipedia.org/wiki/H-1B_visa" },
    ],
  },

  visa: {
    grok:
      "<ul>" +
      "<li>J-1은 문화교류 비자라 <b>'2년 본국 거주 규칙(212(e))'</b>이 붙을 수 있고, 그린카드 경로가 없다.</li>" +
      "<li><b>스폰서 회사 찾기가 어렵다.</b> 특히 방산류 일은 <b>시민권이 필요</b>해서 스폰서가 불가능하다.</li>" +
      "<li>대안: 창발 같은 데서 직접 물어보고, <b>'한국 베이스' 전략을 병행</b>하라.</li>" +
      "</ul>",
    claude:
      "<p>먼저 <b>DS-2019로 212(e) 적용 여부</b>부터 확정하라(적용되면 waiver 전엔 H-1B·그린카드 불가). " +
      "적용된다면 <b>no-objection waiver</b> 가능성을 계산 — '한국 먼저' 플랜에선 J-1이 오히려 <b>2년 발목</b>이 될 수 있으니, 비자를 받기 전에 이 조건부터 따져야 한다.</p>",
    sources: [
      { label: "state.gov: J-1 waiver", url: "https://travel.state.gov/content/travel/en/us-visas/study/exchange/waiver-of-the-exchange-visitor.html" },
      { label: "USCIS I-612", url: "https://www.uscis.gov/i-612" },
    ],
  },

  "american-dream": {
    grok:
      "<ul>" +
      "<li>'AD 2.0' = <b>밖에서 일해 US 마켓을 가져가기</b>. 하지만 <b>소프트웨어론 회의적</b> — 미국은 남의 나라 코딩·소스를 절대 안 쓴다(틱톡이 증거: 소스·미국법인 강제).</li>" +
      "<li>원격 차익은 <b>'한국이 경쟁력 있는 물리적 제품'</b>이 있어야 한다(예: 화장품). 하드웨어는 이미 중국이 카피하고, 소스까지 새면 <b>남는 게 없다</b>.</li>" +
      "</ul>",
    claude:
      "<p>원격 US수익은 <b>'서비스·오케스트레이션'(네 FDE형)</b>엔 통하지만 <b>'제품 판매'엔 벽</b>이 있다. " +
      "지리적 차익 + <b>세금·PE(고정사업장) 함정</b>을 조심 — 한국 base로 US 계약을 <b>'서비스'로 잡는 구조</b>가 현실적이다. FIRE는 '수익'보다 <b>'세후·환율·지속성'</b>으로 계산하라.</p>",
    sources: [
      { label: "Forbes: new American Dream overseas", url: "https://www.forbes.com/sites/meggenharris/2026/05/12/the-new-american-dream-may-be-overseas/" },
      { label: "Permanent establishment (세무 개념)", url: "https://en.wikipedia.org/wiki/Permanent_establishment" },
    ],
  },

  "ai-literacy": {
    grok:
      "<ul>" +
      "<li>개발자 대상 '바이브코딩' 교육은 <b>포화</b> — 다들 이미 갖고 있어 차별화가 없다.</li>" +
      "<li>반면 <b>비개발자(마케팅·영업·행정)</b>에게 '자기 업무 효율화 툴'로 가르치는 건 유효하다 — 미국의 <b>컨설턴트</b> 역할과 같다.</li>" +
      "<li>핵심 비즈니스 모델: 학습자 자비로는 <b>지속 불가</b>. <b>정부 지원</b>이 붙어야 된다. 한국은 청년실업 대응으로 <b>1인당 지원금이 크고</b>, 그게 운영자에게 흐른다.</li>" +
      "<li>월 소액 과금은 <b>지속·투자 유치가 어렵다</b> — <b>'비영리 + 정부 그랜트'</b> 모델로 봐라.</li>" +
      "</ul>",
    claude:
      "<p>'접근성'은 초기 우위지만 <b>빠르게 상품화</b>된다 — 진짜 해자는 <b>커뮤니티·기록</b>(네 42식 peer-review 모델)과 <b>정부 트랙</b>이다. " +
      "1인 강사 → 플랫폼의 답은 네 철학 그대로: <b>'커뮤니티 기록이 커리큘럼이 된다'</b>. 실행 레버는 <b>국비(내일배움/K-Digital) 정렬</b>.</p>",
    sources: [
      { label: "Mordor: AI corporate-training market", url: "https://www.mordorintelligence.com/industry-reports/ai-powered-corporate-training-market" },
      { label: "HRD-Net (국민내일배움카드)", url: "https://www.hrd.go.kr" },
    ],
  },

  "sell-the-tech": {
    grok:
      "<ul>" +
      "<li>미국에서 떼부자 되는 길은 <b>3가지</b>: 회사를 만들어 <b>팔기</b>, 부동산, 주식.</li>" +
      "<li>미국은 <b>'제품을 팔려고'가 아니라 '회사를 팔려고'</b> 만든다. VC는 <b>세일즈 플레이엔 투자 안 한다</b>.</li>" +
      "<li>엑싯한 기술창업자가 가장 존경(그리고 두려움)받는 사람 — 기득권도 못 건드린다.</li>" +
      "<li>이유: 월급은 <b>세금이 다 먹어</b> 부자처럼 못 산다. <b>지분 엑싯</b>이 진짜 부의 사건이다.</li>" +
      "</ul>",
    claude:
      "<p>처음부터 <b>'인수 가능성(acquirable)'</b>을 설계하라 — 독점 데이터, 전환비용, 팀. " +
      "다만 build-to-sell만이 답은 아니다(생존편향) — <b>현금흐름 좋은 '작지만 단단한'</b> 길도 있다. " +
      "네겐 <b>Physical AI 배포 데이터</b>가 잠재 해자다: 남이 못 모으는 데이터를 쌓는 쪽으로 방향을 잡아라.</p>",
    sources: [
      { label: "Acqui-hiring (개념)", url: "https://en.wikipedia.org/wiki/Acqui-hiring" },
      { label: "CB Insights: why startups fail", url: "https://www.cbinsights.com/research/report/startup-failure-reasons-top/" },
    ],
  },

  "korea-grant-game": {
    grok:
      "<ul>" +
      "<li>한국 스타트업은 <b>정부 돈</b>으로 큰다. 더 받으려 <b>'상(award)'</b>, 특히 <b>CES 상</b>을 노린다 — CES 상 받으면 정부가 더 준다.</li>" +
      "<li><b>상장(award) &gt; 매출</b>: 유니크함을 못 판단하니 award로 판단한다. 매출은 잘 안 나온다.</li>" +
      "<li>흔한 패턴(익명): 한 한국 <b>의료 AI 스타트업</b> — 정부·병원 연계로 한국선 성공했지만, SF에선 '이런 회사 미국에 널렸다'며 투자 실패.</li>" +
      "<li>플레이북: <b>K-스타트업(정부 돈) → CES 상 → 더 받기 → 트랙션 → 다음 단계</b>. 이게 제일 빠르다.</li>" +
      "</ul>",
    claude:
      "<p>TIPS·K-Startup 트랙 + <b>CES Innovation Award</b>는 실제 자금 시그널이 맞다. " +
      "단 grant 의존은 <b>'고객 없는 성장'</b> 위험이 있으니 — award로 시작하되 <b>진짜 트랙션(배포 수, 대체한 인건비)</b>으로 빨리 갈아타라. 정부가 원하는 건 결국 '숫자로 증명되는 대체 효과'다.</p>",
    sources: [
      { label: "K-Startup (정부 포털)", url: "https://www.k-startup.go.kr" },
      { label: "CES Innovation Awards", url: "https://www.ces.tech/innovation-awards/" },
    ],
  },

  "physical-labor": {
    grok:
      "<ul>" +
      "<li>Physical AI의 진짜 핵심 = <b>외국인·이주 노동 대체</b>다. 이게 '코어'.</li>" +
      "<li>한국의 <b>3박자</b>: (1) 다양한 <b>소규모 공장</b>이 많고, (2) <b>중국 시스템을 못 쓰고</b>, (3) 소기업은 <b>'커스터마이즈된' 로봇</b>이 필요하다(대기업은 자체 제작).</li>" +
      "<li>비엔지니어도 <b>'배포 + 커스터마이즈(코딩)'</b>로 들어갈 수 있다 — 단, 엔지니어 출신은 ~1년이면 이해(넌 4년) → <b>'수박 겉핥기' 위험</b>. 현실적 목표와 '정부가 원하는 인재 수준'을 파악하라.</li>" +
      "<li>프레이밍: <b>'이 소프트웨어가 이주노동을 얼마나 대체하나'</b>로 증명하면 정부 돈이 온다. 이왕이면 <b>'사과보다 드론'</b> — 미국이 못 건드는 타깃을 골라라.</li>" +
      "</ul>",
    claude:
      "<p>이건 이미 네 <b>career-and-services 문서의 '노동 논거'</b> 그대로다 — 다만 네가 거기 정직하게 달아둔 단서도 같이 기억하라: <b>'지금 당장 일자리가 폭발한 건 아직 거짓'</b>. 그러니 정부·K-Startup엔 '미래 대체'가 아니라 <b>지금 증명 가능한 단위</b>로 말해야 한다. 그 단위가 바로 네 <b>졸업 조건(미션 6 '저거 집어': LangSAM→GraspGen)</b> 데모 영상이다 — '이 소프트웨어가 노동자 한 명의 pick&place를 대체한다'의 가장 깔끔한 증거이고, 이력서 한 장보다 강하다.</p>" +
      "<p>Grok이 말한 <b>'비엔지니어도 커스터마이즈=코딩으로'</b>는, 네가 ROS·임베디드·LiDAR를 의도적으로 빼고 <b>'학습·정책 층'</b>만 가르치는 설계 그 자체다 — 네 오케스트레이션·검증 강점이 정확히 여기 얹힌다. '수박 겉핥기' 위험의 구체적 형태는 네 <b>ROS 딜레마</b>(한국 공고는 ROS2·C++ 필수인데 넌 안 가르침): 현실적 목표는 (1) 미션 6까지 <b>네 손으로</b> 끝내 데모를 확보하고, (2) 졸업생이 ROS2로 걸리는 <b>첫 피드백이 오면 즉시 트랙을 추가</b>하는 것 — 신념이 아니라 데이터로. 국비 무료+장비 지급과 정면 경쟁은 지니, <b>'직장 다니는 개발자'</b>를 노리고 국비 부트캠프의 <b>'입문 앞단'을 B2B로 납품</b>하는 길이 Grok의 '정부 돈'과 네 차별점(form)이 만나는 지점이다.</p>",
    sources: [
      { label: "Physical Spark (커리큘럼)", url: "https://physical-spark.bit-habit.com" },
      { label: "SmolVLA — 맥북에서 도는 VLA", url: "https://huggingface.co/blog/smolvla" },
      { label: "LeRobot (Hugging Face)", url: "https://github.com/huggingface/lerobot" },
      { label: "WEF: Future of Jobs 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
    ],
  },

  "startup-rules": {
    grok:
      "<ul>" +
      "<li><b>절대 네 돈 쓰지 마라</b> — 정부·공짜 돈으로 해라. 자기 돈 쓰다 <b>집안 망한</b> 경우를 봤다.</li>" +
      "<li><b>펀딩이 확정되기 전엔 직장을 버리지 마라.</b> 재직 중에 펀딩 가능성을 먼저 검증했다.</li>" +
      "<li><b>생활이 먼저다</b> — 생활이 안 되면 창업 못 한다.</li>" +
      "<li>보조금이 <b>살아있을 때 들어가</b> 끝나기 전(~2년)에 자리 잡고, <b>트랙션으로 다음으로 점프</b>하라.</li>" +
      "<li>빚내서 창업 = 용기가 아니라 <b>바보</b>다.</li>" +
      "</ul>",
    claude:
      "<p>런웨이·생활비 = <b>'리스크 예산'</b>으로 명시적으로 계산하라. grant-first는 <b>지분 희석 없이 검증</b>하는 좋은 방법. " +
      "'언제 직장을 떠나나'의 신호 = <b>계약된 매출·펀딩이 생활비를 커버</b>하는 순간. 그 전엔 부업으로 둔다. 빚은 옵션이 아니라 <b>마지막</b>이다.</p>",
    sources: [
      { label: "CB Insights: why startups fail", url: "https://www.cbinsights.com/research/report/startup-failure-reasons-top/" },
    ],
  },

  "china-ip": {
    grok:
      "<ul>" +
      "<li>중국은 <b>다 카피하고 가격으로 후려친다</b> — 미국도 이게 문제. 현대는 중국차에 밀리고, 테슬라는 <b>엔지니어링</b>으로 이긴다.</li>" +
      "<li>미국은 소프트웨어를 <b>오프쇼어·소스 이전 절대 안 한다</b> — 하드웨어가 카피되면 <b>알고리즘만 해자</b>. 틱톡(소스·미국법인 강제)이 대표 사례.</li>" +
      "<li>값싼 오프쇼어 개발엔 <b>소스 유출 리스크</b>가 따른다(외주 개발자가 퇴사하며 코드를 들고 나가는 식).</li>" +
      "<li>AI(바이브)코딩이 <b>인도·파키스탄 아웃소싱을 대체</b> 중 — 가치는 코드를 <b>'검증(verification)'</b>하는 사람에게 간다.</li>" +
      "</ul>",
    claude:
      "<p>작은 팀의 IP 보호 = <b>영업비밀(접근통제) + 속도 + 데이터 해자(모델 가중치·배포 데이터)</b>; 특허는 보조다. " +
      "'검증 역할'은 당분간 유효하지만, 결국 <b>'무엇을 만들지 정의하는 사람'</b>으로 올라서야 한다. 방산이 AI코딩을 미는 이유도 <b>외국 개발자 회피</b>라는 걸 기억.</p>",
    sources: [
      { label: "TikTok divestiture law (PAFACA)", url: "https://en.wikipedia.org/wiki/Protecting_Americans_from_Foreign_Adversary_Controlled_Applications_Act" },
    ],
  },

};
