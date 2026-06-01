/**
 * SUSHI.TOP - 寿司口味趣味测试
 * 纯原生JS实现，无需任何依赖
 */

(function() {
  'use strict';

  // 测试题目
  const QUESTIONS = [
    {
      id: 1,
      question: '你更偏好什么口味的食物？',
      icon: '🍽️',
      options: [
        { text: '清淡鲜甜', value: 'light', icon: '🌿' },
        { text: '浓郁醇厚', value: 'rich', icon: '🧀' },
        { text: '酸甜开胃', value: 'sweet', icon: '🍯' },
        { text: '咸香可口', value: 'savory', icon: '🥟' }
      ]
    },
    {
      id: 2,
      question: '你对生食的态度是？',
      icon: '🐟',
      options: [
        { text: '完全OK，很喜欢', value: 'love_raw', icon: '❤️' },
        { text: '可以接受偶尔', value: 'ok_raw', icon: '👍' },
        { text: '尽量避免', value: 'avoid_raw', icon: '🤔' },
        { text: '完全不吃', value: 'hate_raw', icon: '❌' }
      ]
    },
    {
      id: 3,
      question: '吃寿司时你更喜欢哪种配料风格？',
      icon: '🍣',
      options: [
        { text: '单一纯粹的鱼生', value: 'pure', icon: '🐟' },
        { text: '丰富的综合组合', value: 'mixed', icon: '🎨' },
        { text: '配蔬菜的清爽款', value: 'veggie', icon: '🥗' },
        { text: '加酱料的浓郁款', value: 'sauced', icon: '🥫' }
      ]
    },
    {
      id: 4,
      question: '你吃寿司的频率大概是？',
      icon: '📅',
      options: [
        { text: '经常吃，很熟悉', value: 'expert', icon: '⭐' },
        { text: '偶尔尝尝鲜', value: 'regular', icon: '✨' },
        { text: '特殊场合才吃', value: 'special', icon: '🎉' },
        { text: '刚入门的新手', value: 'beginner', icon: '🌱' }
      ]
    },
    {
      id: 5,
      question: '如果只能选一个，你会选？',
      icon: '🎯',
      options: [
        { text: '经典的三文鱼', value: 'salmon', icon: '🍣' },
        { text: '鲜甜的金枪鱼', value: 'tuna', icon: '🐠' },
        { text: '爽口的黄瓜卷', value: 'cucumber', icon: '🥒' },
        { text: '浓郁的鳗鱼', value: 'eel', icon: '🐍' }
      ]
    }
  ];

  // 测试结果
  const RESULTS = [
    {
      name: '经典三文鱼握寿司',
      badge: '🍣',
      desc: '你是寿司界的经典派！追求食材本味的鲜美，三文鱼丰腴的油脂与细腻口感是你的心头好。简单纯粹，却回味无穷。',
      keywords: ['纯粹', '经典', '鲜美']
    },
    {
      name: '华丽散寿司',
      badge: '🍱',
      desc: '你是个讲究生活品质的人！喜欢色彩斑斓的视觉享受，各式海鲜汇聚一盒，每一口都是惊喜与满足。',
      keywords: ['丰富', '精致', '讲究']
    },
    {
      name: '清新太卷',
      badge: '🥒',
      desc: '你是小清新的代表！喜欢清爽不腻的口感，蔬菜的脆嫩与米饭的软糯完美搭配，吃出健康好心情。',
      keywords: ['清新', '健康', '轻盈']
    },
    {
      name: '浓厚鳗鱼军舰',
      badge: '🐍',
      desc: '你有独特的美食品味！鳗鱼的酱香浓郁与海苔的咸香完美结合，口感层次丰富，让人欲罢不能。',
      keywords: ['浓郁', '醇厚', '层次感']
    },
    {
      name: '金枪鱼泥军舰',
      badge: '🐟',
      desc: '你是追求极致口感的人！将金枪鱼细细剁成泥状，入口即化，鲜美在舌尖绽放，每一口都是享受。',
      keywords: ['细腻', '入口即化', '鲜美']
    },
    {
      name: '加州卷',
      badge: '🥑',
      desc: '你走在潮流前沿！牛油果的绵密与蟹棒的鲜甜完美组合，是东西方美食文化的精彩碰撞。',
      keywords: ['创意', '融合', '潮流']
    },
    {
      name: '鲜虾握寿司',
      badge: '🦐',
      desc: '你钟爱大海的味道！鲜虾的Q弹清甜在齿间跳跃，简单却让人回味，是寿司入门者的绝佳选择。',
      keywords: ['清甜', 'Q弹', '海洋']
    },
    {
      name: '稻荷寿司',
      badge: '🍘',
      desc: '你有颗温暖的胃！豆腐皮吸饱了鲜甜的汤汁，咬下去满口留香，是家常味道的代表。',
      keywords: ['温暖', '家常', '香甜']
    }
  ];

  // 状态变量
  let currentQuestion = 0;
  let answers = [];
  let quizContainer;
  let quizProgress;
  let quizContent;

  // 初始化
  function init() {
    quizContainer = document.getElementById('quizContainer');
    quizProgress = document.getElementById('quizProgress');
    quizContent = document.getElementById('quizContent');

    if (!quizContainer) return;

    renderQuestion();
  }

  // 渲染题目
  function renderQuestion() {
    if (currentQuestion >= QUESTIONS.length) {
      showResult();
      return;
    }

    const q = QUESTIONS[currentQuestion];
    const progress = ((currentQuestion) / QUESTIONS.length) * 100;

    // 更新进度条
    quizProgress.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progress}%"></div>
      </div>
      <span class="quiz-progress-text">${currentQuestion + 1}/${QUESTIONS.length}</span>
    `;

    // 渲染选项
    let optionsHtml = q.options.map((opt, index) => `
      <div class="quiz-option" data-value="${opt.value}" onclick="window.sushiQuiz.selectOption(this, '${opt.value}')">
        <div class="quiz-option-icon">${opt.icon}</div>
        <div class="quiz-option-text">${opt.text}</div>
      </div>
    `).join('');

    quizContent.innerHTML = `
      <div class="quiz-question">
        <h3>${q.icon} ${q.question}</h3>
      </div>
      <div class="quiz-options">
        ${optionsHtml}
      </div>
    `;
  }

  // 选择选项
  function selectOption(element, value) {
    // 移除之前的选中状态
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));

    // 添加选中状态
    element.classList.add('selected');

    // 记录答案
    answers[currentQuestion] = value;

    // 延迟切换到下一题
    setTimeout(() => {
      currentQuestion++;
      renderQuestion();
    }, 400);
  }

  // 计算结果
  function calculateResult() {
    // 简单的加权计算
    const scoreMap = {
      'light': 0, 'rich': 1, 'sweet': 2, 'savory': 3,
      'love_raw': 0, 'ok_raw': 1, 'avoid_raw': 2, 'hate_raw': 3,
      'pure': 0, 'mixed': 1, 'veggie': 2, 'sauced': 3,
      'expert': 0, 'regular': 1, 'special': 2, 'beginner': 3,
      'salmon': 0, 'tuna': 1, 'cucumber': 2, 'eel': 3
    };

    let totalScore = 0;
    answers.forEach(answer => {
      totalScore += scoreMap[answer] || 0;
    });

    // 根据分数范围确定结果
    const index = Math.min(Math.floor(totalScore / 2), RESULTS.length - 1);
    return RESULTS[index];
  }

  // 显示结果
  function showResult() {
    const result = calculateResult();
    const progress = 100;

    quizProgress.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progress}%"></div>
      </div>
      <span class="quiz-progress-text">完成!</span>
    `;

    quizContent.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-badge">${result.badge}</div>
        <h2 class="quiz-result-name">${result.name}</h2>
        <p class="quiz-result-desc">${result.desc}</p>
        <div style="margin-top: 1rem;">
          ${result.keywords.map(k => `<span class="item-tag">${k}</span>`).join('')}
        </div>
        <div class="quiz-share">
          <button class="btn btn-secondary" onclick="window.sushiQuiz.restart()">
            🔄 重新测试
          </button>
        </div>
      </div>
    `;
  }

  // 重新开始
  function restart() {
    currentQuestion = 0;
    answers = [];
    renderQuestion();
  }

  // 暴露方法到全局
  window.sushiQuiz = {
    selectOption: selectOption,
    restart: restart
  };

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
