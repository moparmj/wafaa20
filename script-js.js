// مزخرف النصوص | Text Decorator
// الملف الرئيسي للجافاسكريبت

// العناصر DOM
const textInput = document.getElementById('textInput');
const decorationSelect = document.getElementById('decorationSelect');
const customDecoration = document.getElementById('customDecoration');
const prefixInput = document.getElementById('prefixInput');
const suffixInput = document.getElementById('suffixInput');
const decorateBtn = document.getElementById('decorateBtn');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');
const resultBox = document.getElementById('result');

// أنواع الزخرفة
const decorationTypes = {
    stars: { prefix: '⭐ ', suffix: ' ⭐' },
    hearts: { prefix: '❤️ ', suffix: ' ❤️' },
    squares: { prefix: '🔲 ', suffix: ' 🔲' },
    brackets: { prefix: '【 ', suffix: ' 】' },
    flowers: { prefix: '🌸 ', suffix: ' 🌸' },
    frame: { prefix: '', suffix: '' }, // سيتم معالجتها بشكل خاص
    custom: { prefix: '', suffix: '' }  // سيتم تحديدها بواسطة المستخدم
};

// إظهار / إخفاء خيارات الزخرفة المخصصة
decorationSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
        customDecoration.classList.remove('hidden');
    } else {
        customDecoration.classList.add('hidden');
    }
});

// تطبيق الزخرفة عند النقر على الزر
decorateBtn.addEventListener('click', applyDecoration);

// إعادة تعيين النموذج
resetBtn.addEventListener('click', function() {
    textInput.value = '';
    resultBox.textContent = '';
    decorationSelect.value = 'stars';
    customDecoration.classList.add('hidden');
    prefixInput.value = '';
    suffixInput.value = '';
    copyBtn.disabled = true;
    copyBtn.textContent = 'نسخ النص';
    copyBtn.classList.remove('copied');
});

// نسخ النص المزخرف
copyBtn.addEventListener('click', function() {
    const textToCopy = resultBox.textContent;
    navigator.clipboard.writeText(textToCopy).then(function() {
        copyBtn.textContent = 'تم النسخ! ✓';
        copyBtn.classList.add('copied');
        
        setTimeout(function() {
            copyBtn.textContent = 'نسخ النص';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

// تطبيق الزخرفة المختارة على النص
function applyDecoration() {
    const text = textInput.value.trim();
    if (!text) {
        alert('الرجاء إدخال نص لتزيينه');
        return;
    }
    
    const decorationType = decorationSelect.value;
    let result = '';
    
    if (decorationType === 'frame') {
        result = createTextFrame(text);
    } else {
        let decorationObj = decorationTypes[decorationType];
        
        if (decorationType === 'custom') {
            decorationObj.prefix = prefixInput.value || '';
            decorationObj.suffix = suffixInput.value || '';
        }
        
        result = decorationObj.prefix + text + decorationObj.suffix;
    }
    
    resultBox.textContent = result;
    copyBtn.disabled = false;
}

// إنشاء إطار نصي كامل
function createTextFrame(text) {
    // تحديد أقصى طول للسطر الواحد
    const lines = text.split('\n');
    let maxLength = 0;
    
    for (const line of lines) {
        if (line.length > maxLength) {
            maxLength = line.length;
        }
    }
    
    // إنشاء الحدود العلوية والسفلية
    const topBorder = '╔' + '═'.repeat(maxLength + 2) + '╗';
    const bottomBorder = '╚' + '═'.repeat(maxLength + 2) + '╝';
    
    // إنشاء الإطار
    let framedText = topBorder + '\n';
    
    for (const line of lines) {
        // إضافة مسافات للحصول على عرض متساوٍ
        const padding = ' '.repeat(maxLength - line.length);
        framedText += '║ ' + line + padding + ' ║\n';
    }
    
    framedText += bottomBorder;
    
    // إضافة الفئة للمساعدة في التنسيق
    resultBox.classList.add('frame-result');
    
    return framedText;
}

// استقبال أحداث الضغط على Enter لتطبيق الزخرفة
textInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        applyDecoration();
    }
});

// تهيئة البرنامج
function init() {
    // تحديد الزخرفة الافتراضية
    decorationSelect.value = 'stars';
    // إخفاء خيارات الزخرفة المخصصة في البداية
    customDecoration.classList.add('hidden');
}

// بدء تشغيل البرنامج عند تحميل الصفحة
window.addEventListener('load', init);
