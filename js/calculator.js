/**
 * SUSHI.TOP - 寿司配比计算器
 * 纯原生JS实现，无需任何依赖
 */

(function() {
  'use strict';

  // 计算常量（每人份量）
  const PORTION_PER_PERSON = {
    rice: 150,      // 寿司米 g
    water: 180,     // 水 ml
    vinegar: 30,     // 寿司醋 ml
    sugar: 8,        // 砂糖 g
    salt: 2,         // 盐 g
    nori: 2          // 海苔 片
  };

  // DOM 元素
  let personInput;
  let calculateBtn;
  let resetBtn;
  let resultBox;
  let resultGrid;

  // 初始化
  function init() {
    personInput = document.getElementById('personCount');
    calculateBtn = document.getElementById('calculateBtn');
    resetBtn = document.getElementById('resetBtn');
    resultBox = document.getElementById('resultBox');
    resultGrid = document.getElementById('resultGrid');

    if (!personInput || !calculateBtn || !resetBtn) return;

    // 绑定事件
    calculateBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', reset);
    personInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') calculate();
    });

    // 输入验证
    personInput.addEventListener('input', validateInput);
  }

  // 输入验证
  function validateInput() {
    let value = parseInt(personInput.value);
    if (value < 1) {
      personInput.value = 1;
    } else if (value > 100) {
      personInput.value = 100;
    }
  }

  // 计算
  function calculate() {
    const persons = parseInt(personInput.value) || 1;
    const validPersons = Math.max(1, Math.min(100, persons));

    // 计算各项用量
    const results = {
      rice: validPersons * PORTION_PER_PERSON.rice,
      water: validPersons * PORTION_PER_PERSON.water,
      vinegar: validPersons * PORTION_PER_PERSON.vinegar,
      sugar: validPersons * PORTION_PER_PERSON.sugar,
      salt: validPersons * PORTION_PER_PERSON.salt,
      nori: validPersons * PORTION_PER_PERSON.nori
    };

    // 显示结果
    renderResults(results, validPersons);

    // 更新按钮文字
    calculateBtn.innerHTML = '🔄 重新计算';
  }

  // 渲染结果
  function renderResults(results, persons) {
    resultBox.style.display = 'block';

    const items = [
      { key: 'rice', value: results.rice, unit: 'g', label: '寿司米', icon: '🍚' },
      { key: 'water', value: results.water, unit: 'ml', label: '水', icon: '💧' },
      { key: 'vinegar', value: results.vinegar, unit: 'ml', label: '寿司醋', icon: '🍶' },
      { key: 'sugar', value: results.sugar, unit: 'g', label: '砂糖', icon: '🍬' },
      { key: 'salt', value: results.salt, unit: 'g', label: '盐', icon: '🧂' },
      { key: 'nori', value: results.nori, unit: '片', label: '海苔', icon: '🥬' }
    ];

    let html = `
      <div class="result-title">📊 ${persons}人份寿司配料</div>
      <div class="result-grid">
    `;

    items.forEach(item => {
      html += `
        <div class="result-item">
          <div class="result-value">${item.icon} ${item.value}${item.unit}</div>
          <div class="result-label">${item.label}</div>
        </div>
      `;
    });

    html += '</div>';

    // 添加小贴士
    html += `
      <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px dashed var(--border);">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          💡 小贴士：以上为参考用量，可根据个人口味适当调整
        </p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;">
          寿司醋配方：米醋100ml + 砂糖30g + 盐10g，可提前混合好备用
        </p>
      </div>
    `;

    resultGrid.innerHTML = html;
  }

  // 重置
  function reset() {
    personInput.value = 1;
    resultBox.style.display = 'none';
    calculateBtn.innerHTML = '🥢 开始计算';
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
