import React, { useState, useEffect, useRef } from 'react';

const FontCreator = () => {
  // تعريف مجموعة موسعة ومتنوعة من الخطوط
  const fontShapes = [
    // الخطوط العربية التقليدية والتراثية
    { name: 'نسخ', fontFamily: 'Arial, sans-serif', weight: 'normal', style: 'normal', decoration: 'none', isArabic: true },
    { name: 'كوفي', fontFamily: 'Tahoma, sans-serif', weight: 'bold', style: 'normal', decoration: 'none', isArabic: true },
    { name: 'ديواني', fontFamily: 'cursive, sans-serif', weight: 'bold', style: 'italic', decoration: 'none', isArabic: true },
    { name: 'رقعة', fontFamily: 'Verdana, sans-serif', weight: 'bold', style: 'normal', decoration: 'none', isArabic: true },
    { name: 'ثلث', fontFamily: 'Georgia, serif', weight: 'bold', style: 'italic', decoration: 'underline', isArabic: true },
    { name: 'محقق', fontFamily: 'fantasy, sans-serif', weight: 'bold', style: 'normal', decoration: 'none', outline: true, isArabic: true },
    { name: 'مصحفي', fontFamily: 'serif', weight: 'normal', style: 'normal', decoration: 'none', elegant: true, isArabic: true },
    { name: 'فارسي', fontFamily: 'Georgia, serif', weight: 'bold', style: 'italic', decoration: 'none', shadow: true, isArabic: true },
    { name: 'مغربي', fontFamily: 'Palatino, serif', weight: 'normal', style: 'italic', decoration: 'none', rounded: true, isArabic: true },
    
    // الخطوط اللاتينية الشائعة
    { name: 'Arial', fontFamily: 'Arial, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Tahoma', fontFamily: 'Tahoma, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Verdana', fontFamily: 'Verdana, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Times', fontFamily: 'Times New Roman, serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Georgia', fontFamily: 'Georgia, serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Courier', fontFamily: 'Courier New, monospace', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Impact', fontFamily: 'Impact, fantasy', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Comic Sans', fontFamily: 'Comic Sans MS, cursive', weight: 'normal', style: 'normal', decoration: 'none' },
    
    // خطوط إضافية متنوعة
    { name: 'Helvetica', fontFamily: 'Helvetica, Arial, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Calibri', fontFamily: 'Calibri, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Cambria', fontFamily: 'Cambria, serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Trebuchet', fontFamily: 'Trebuchet MS, sans-serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Palatino', fontFamily: 'Palatino Linotype, serif', weight: 'normal', style: 'normal', decoration: 'none' },
    { name: 'Garamond', fontFamily: 'Garamond, serif', weight: 'normal', style: 'normal', decoration: 'none' }
  ];

  const [selectedShape, setSelectedShape] = useState(0);
  const [text, setText] = useState('لاتنسى ذكر الله');
  const [fontSize, setFontSize] = useState(40);
  const [fontColor, setFontColor] = useState('#d10000');
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [showFlowers, setShowFlowers] = useState(false);
  const [decorationType, setDecorationType] = useState('flowers');
  const [secondaryColor, setSecondaryColor] = useState('#4CAF50');
  const [copySuccess, setCopySuccess] = useState('');
  const canvasRef = useRef(null);

  // دالة لرسم النص على الكانفاس
  const drawText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // مسح الكانفاس
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // تعيين خصائص الخط
    const shape = fontShapes[selectedShape];
    ctx.font = `${shape.style} ${shape.weight} ${fontSize}px ${shape.fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // تطبيق تأثيرات خاصة حسب نوع الخط
    if (shape.shadow) {
      // خط فارسي - مع ظل
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = fontSize / 6;
      ctx.shadowOffsetX = fontSize / 15;
      ctx.shadowOffsetY = fontSize / 15;
      ctx.fillText(text, centerX, centerY);
      ctx.shadowColor = 'transparent';
    } else if (shape.outline) {
      // خط محقق - مع محيط خارجي
      ctx.strokeStyle = fontColor;
      ctx.lineWidth = fontSize / 15;
      ctx.strokeText(text, centerX, centerY);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, centerX, centerY);
      ctx.strokeStyle = fontColor;
      ctx.lineWidth = 1;
      ctx.strokeText(text, centerX, centerY);
    } else if (shape.textured) {
      // خط تواقيع - مع تأثير نسيج
      const textWidth = ctx.measureText(text).width;
      const startX = centerX - textWidth / 2;
      const endX = centerX + textWidth / 2;
      
      const gradient = ctx.createLinearGradient(startX, centerY - fontSize/2, endX, centerY + fontSize/2);
      gradient.addColorStop(0, fontColor);
      gradient.addColorStop(0.5, adjustColor(fontColor, 40));
      gradient.addColorStop(1, fontColor);
      ctx.fillStyle = gradient;
      ctx.fillText(text, centerX, centerY);
      
      // إضافة خطوط رفيعة للتأثير
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = adjustColor(fontColor, -30);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, centerY - fontSize/2 + (i * fontSize/3));
        ctx.lineTo(endX, centerY - fontSize/2 + (i * fontSize/3));
        ctx.stroke();
      }
    } else if (shape.rounded) {
      // خط مغربي - مع نهايات مستديرة وميل
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.05);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else if (shape.elegant) {
      // خط مصحفي - أنيق مع زخارف
      const textWidth = ctx.measureText(text).width;
      const startX = centerX - textWidth / 2;
      const endX = centerX + textWidth / 2;
      
      ctx.fillText(text, centerX, centerY);
      
      // إضافة زخارف أنيقة
      ctx.lineWidth = 1;
      ctx.strokeStyle = fontColor;
      
      ctx.beginPath();
      ctx.moveTo(startX - 20, centerY - fontSize/2 - 10);
      ctx.lineTo(startX + 20, centerY - fontSize/2 - 10);
      ctx.moveTo(endX - 20, centerY + fontSize/2 + 10);
      ctx.lineTo(endX + 20, centerY + fontSize/2 + 10);
      ctx.stroke();
      
      // إضافة نقاط زخرفية
      ctx.fillStyle = fontColor;
      ctx.beginPath();
      ctx.arc(startX - 20, centerY - fontSize/2 - 10, 2, 0, Math.PI * 2);
      ctx.arc(startX + 20, centerY - fontSize/2 - 10, 2, 0, Math.PI * 2);
      ctx.arc(endX - 20, centerY + fontSize/2 + 10, 2, 0, Math.PI * 2);
      ctx.arc(endX + 20, centerY + fontSize/2 + 10, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // رسم النص العادي
      ctx.fillText(text, centerX, centerY);
      
      // إضافة تزيينات إذا كانت موجودة
      if (shape.decoration !== 'none') {
        const textWidth = ctx.measureText(text).width;
        const startX = centerX - textWidth / 2;
        const endX = centerX + textWidth / 2;
        
        ctx.beginPath();
        
        if (shape.decoration === 'underline') {
          ctx.moveTo(startX, centerY + fontSize / 2);
          ctx.lineTo(endX, centerY + fontSize / 2);
        } else if (shape.decoration === 'overline') {
          ctx.moveTo(startX, centerY - fontSize / 2);
          ctx.lineTo(endX, centerY - fontSize / 2);
        } else if (shape.decoration === 'line-through') {
          ctx.moveTo(startX, centerY);
          ctx.lineTo(endX, centerY);
        }
        
        ctx.strokeStyle = fontColor;
        ctx.lineWidth = fontSize / 20;
        ctx.stroke();
      }
      
      // إضافة تأثيرات إضافية للشكل "ماسي"
      if (selectedShape === 9) {
        const textWidth = ctx.measureText(text).width;
        const startX = centerX - textWidth / 2;
        const endX = centerX + textWidth / 2;
        
        // رسم شكل ماسي حول النص
        ctx.beginPath();
        ctx.moveTo(startX - 20, centerY);
        ctx.lineTo(startX - 10, centerY - fontSize / 2 - 10);
        ctx.lineTo(endX + 10, centerY - fontSize / 2 - 10);
        ctx.lineTo(endX + 20, centerY);
        ctx.lineTo(endX + 10, centerY + fontSize / 2 + 10);
        ctx.lineTo(startX - 10, centerY + fontSize / 2 + 10);
        ctx.closePath();
        
        ctx.strokeStyle = fontColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    // إضافة الزخارف إذا كان الخيار مفعل
    if (showFlowers) {
      const textWidth = ctx.measureText(text).width;
      const startX = centerX - textWidth / 2;
      const endX = centerX + textWidth / 2;
      drawDecorationBorder(ctx, startX, endX, centerY, fontSize, fontColor, secondaryColor, decorationType);
    }
  };
  
  // دالة لرسم زخارف حول النص
  const drawDecorationBorder = (ctx, startX, endX, centerY, fontSize, primaryColor, secondaryColor, type) => {
    const width = endX - startX;
    const decorationCount = Math.max(3, Math.ceil(width / (fontSize * 0.6)));
    const decorationSize = fontSize * 0.2;
    
    // زيادة المسافة لمنع تداخل الزخارف مع النص
    const horizontalPadding = fontSize * 0.6;   // مسافة إضافية على جانبي النص
    const verticalPaddingTop = fontSize * 1.2;  // مسافة إضافية أكبر فوق النص
    const verticalPaddingBottom = fontSize * 0.8; // مسافة إضافية أسفل النص
    
    const safeStartX = startX - horizontalPadding;
    const safeEndX = endX + horizontalPadding;
    const safeWidth = safeEndX - safeStartX;
    
    // رسم زخارف أعلى النص (بمسافة آمنة أكبر)
    for (let i = 0; i < decorationCount; i++) {
      const x = safeStartX + (safeWidth * i / (decorationCount - 1));
      const y = centerY - verticalPaddingTop;
      
      switch (type) {
        case 'flowers':
          drawSimpleFlower(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'hearts':
          drawHeart(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'stars':
          drawStar(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'diamonds':
          drawDiamond(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'mixed':
          // اختيار نوع عشوائي لكل زخرفة
          const types = ['flowers', 'hearts', 'stars', 'diamonds'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          if (randomType === 'flowers') {
            drawSimpleFlower(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else if (randomType === 'hearts') {
            drawHeart(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else if (randomType === 'stars') {
            drawStar(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else {
            drawDiamond(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          }
          break;
      }
    }
    
    // رسم زخارف أسفل النص (بمسافة آمنة)
    for (let i = 0; i < decorationCount; i++) {
      const x = safeStartX + (safeWidth * i / (decorationCount - 1));
      const y = centerY + verticalPaddingBottom;
      
      switch (type) {
        case 'flowers':
          drawSimpleFlower(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'hearts':
          drawHeart(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'stars':
          drawStar(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'diamonds':
          drawDiamond(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          break;
        case 'mixed':
          // اختيار نوع عشوائي لكل زخرفة
          const types = ['flowers', 'hearts', 'stars', 'diamonds'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          if (randomType === 'flowers') {
            drawSimpleFlower(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else if (randomType === 'hearts') {
            drawHeart(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else if (randomType === 'stars') {
            drawStar(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          } else {
            drawDiamond(ctx, x, y, decorationSize, primaryColor, secondaryColor);
          }
          break;
      }
    }
    
    // رسم زخارف على جانبي النص (بمسافة آمنة)
    const sideDecorCount = Math.ceil(fontSize / (decorationSize * 3));
    const sidePadding = fontSize * 0.5; // إضافة مسافة إضافية للزخارف الجانبية
    
    for (let i = 0; i < sideDecorCount; i++) {
      const yOffset = (i - (sideDecorCount - 1) / 2) * (fontSize * 0.5);
      
      // اختيار الزخرفة المناسبة
      const drawSelectedDecoration = (x, y, size) => {
        switch (type) {
          case 'flowers':
            drawSimpleFlower(ctx, x, y, size, primaryColor, secondaryColor);
            break;
          case 'hearts':
            drawHeart(ctx, x, y, size, primaryColor, secondaryColor);
            break;
          case 'stars':
            drawStar(ctx, x, y, size, primaryColor, secondaryColor);
            break;
          case 'diamonds':
            drawDiamond(ctx, x, y, size, primaryColor, secondaryColor);
            break;
          case 'mixed':
            const types = ['flowers', 'hearts', 'stars', 'diamonds'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            if (randomType === 'flowers') {
              drawSimpleFlower(ctx, x, y, size, primaryColor, secondaryColor);
            } else if (randomType === 'hearts') {
              drawHeart(ctx, x, y, size, primaryColor, secondaryColor);
            } else if (randomType === 'stars') {
              drawStar(ctx, x, y, size, primaryColor, secondaryColor);
            } else {
              drawDiamond(ctx, x, y, size, primaryColor, secondaryColor);
            }
            break;
        }
      };
      
      // زخرفة على اليمين (مع مسافة أمان إضافية)
      drawSelectedDecoration(safeStartX - sidePadding, centerY + yOffset, decorationSize * 0.7);
      // زخرفة على اليسار (مع مسافة أمان إضافية)
      drawSelectedDecoration(safeEndX + sidePadding, centerY + yOffset, decorationSize * 0.7);
    }
  };
  
  // دالة لرسم زهرة بسيطة وواضحة مع لونين
  const drawSimpleFlower = (ctx, x, y, radius, primaryColor, secondaryColor) => {
    const petalCount = 5;
    
    ctx.save();
    ctx.translate(x, y);
    
    // رسم البتلات باللون الثانوي
    for (let i = 0; i < petalCount; i++) {
      const angle = (2 * Math.PI * i) / petalCount;
      
      ctx.save();
      ctx.rotate(angle);
      
      // رسم بتلة على شكل دائرة
      ctx.beginPath();
      ctx.arc(0, radius, radius, 0, Math.PI * 2);
      ctx.fillStyle = secondaryColor;
      ctx.fill();
      
      ctx.restore();
    }
    
    // رسم مركز الزهرة باللون الأساسي
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    
    ctx.restore();
  };
  
  // دالة لرسم قلب
  const drawHeart = (ctx, x, y, size, primaryColor, secondaryColor) => {
    const width = size * 1.8;
    const height = size * 1.8;
    
    ctx.save();
    ctx.translate(x, y);
    
    // رسم القلب
    ctx.beginPath();
    ctx.moveTo(0, height / 4);
    
    // الجانب الأيسر من القلب
    ctx.bezierCurveTo(
      -width / 2, -height / 2,
      -width, 0,
      0, height / 2
    );
    
    // الجانب الأيمن من القلب
    ctx.bezierCurveTo(
      width, 0,
      width / 2, -height / 2,
      0, height / 4
    );
    
    ctx.fillStyle = secondaryColor;
    ctx.fill();
    
    // إضافة تفاصيل داخلية
    ctx.beginPath();
    ctx.moveTo(0, height / 8);
    
    // قلب داخلي أصغر
    ctx.bezierCurveTo(
      -width / 3, -height / 3,
      -width * 0.6, 0,
      0, height / 3
    );
    
    ctx.bezierCurveTo(
      width * 0.6, 0,
      width / 3, -height / 3,
      0, height / 8
    );
    
    ctx.fillStyle = primaryColor;
    ctx.fill();
    
    ctx.restore();
  };
  
  // دالة لرسم نجمة
  const drawStar = (ctx, x, y, size, primaryColor, secondaryColor) => {
    const outerRadius = size * 1.5;
    const innerRadius = size * 0.6;
    const spikes = 5;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 2); // لجعل النجمة مستقيمة
    
    ctx.beginPath();
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * i) / spikes;
      
      if (i === 0) {
        ctx.moveTo(radius, 0);
      } else {
        ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
      }
    }
    
    ctx.closePath();
    ctx.fillStyle = secondaryColor;
    ctx.fill();
    
    // نجمة داخلية أصغر
    const innerStarSize = size * 0.8;
    const innerOuterRadius = innerStarSize;
    const innerInnerRadius = innerStarSize * 0.4;
    
    ctx.beginPath();
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? innerOuterRadius : innerInnerRadius;
      const angle = (Math.PI * i) / spikes;
      
      if (i === 0) {
        ctx.moveTo(radius, 0);
      } else {
        ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
      }
    }
    
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.fill();
    
    ctx.restore();
  };
  
  // دالة لرسم شكل ماسي
  const drawDiamond = (ctx, x, y, size, primaryColor, secondaryColor) => {
    ctx.save();
    ctx.translate(x, y);
    
    // رسم الماسة الخارجية
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.5);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size * 1.5);
    ctx.lineTo(-size, 0);
    ctx.closePath();
    
    ctx.fillStyle = secondaryColor;
    ctx.fill();
    
    // رسم الماسة الداخلية
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.6, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.6, 0);
    ctx.closePath();
    
    ctx.fillStyle = primaryColor;
    ctx.fill();
    
    ctx.restore();
  };
  
  // دالة مساعدة لتعديل لون
  const adjustColor = (color, amount) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // تنفيذ الرسم عند تغيير أي من المدخلات
  useEffect(() => {
    drawText();
  }, [
    selectedShape,
    text,
    fontSize,
    fontColor,
    showFlowers,
    decorationType,
    secondaryColor
  ]);

  // دالة لتصدير الصورة
  const exportImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    
    // إنشاء رابط تنزيل
    const link = document.createElement('a');
    link.href = image;
    link.download = 'custom-font.png';
    link.click();
  };
  
  // دالة لنسخ النص كصورة
  const copyAsImage = () => {
    const canvas = canvasRef.current;
    canvas.toBlob(blob => {
      try {
        // إنشاء عنصر ClipboardItem ونسخه
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item])
          .then(() => {
            setCopySuccess('تم نسخ الصورة بنجاح!');
            setTimeout(() => setCopySuccess(''), 3000);
          })
          .catch(err => {
            console.error('خطأ في نسخ الصورة:', err);
            setCopySuccess('حدث خطأ في نسخ الصورة');
            setTimeout(() => setCopySuccess(''), 3000);
          });
      } catch (err) {
        console.error('خطأ في إنشاء ClipboardItem:', err);
        setCopySuccess('المتصفح لا يدعم نسخ الصور');
        setTimeout(() => setCopySuccess(''), 3000);
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-center">مولد الخطوط المخصصة</h1>
      <h2 className="text-lg text-center mb-6 text-gray-700">مع تحيات متجر رقة وجمال للمنتجات الرقمية / واتساب (0507296007)</h2>
      
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">النص:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-md"
            dir="rtl"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">اختر شكل الخط:</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {fontShapes.map((shape, index) => (
              <button
                key={index}
                className={`p-2 border rounded-md flex flex-col items-center justify-center ${selectedShape === index ? 'bg-blue-500 text-white border-blue-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                onClick={() => setSelectedShape(index)}
                style={{ minHeight: '50px' }}
              >
                <div className="text-sm">
                  {shape.isArabic ? (
                    // عرض اسم الخط العربي كما هو
                    <span style={{ 
                      fontWeight: shape.weight, 
                      fontStyle: shape.style,
                      textDecoration: shape.decoration !== 'none' ? shape.decoration : 'none',
                    }}>{shape.name}</span>
                  ) : (
                    // عرض اسم الخط اللاتيني بالخط نفسه
                    <span style={{ 
                      fontFamily: shape.fontFamily, 
                      fontWeight: shape.weight, 
                      fontStyle: shape.style,
                      textDecoration: shape.decoration !== 'none' ? shape.decoration : 'none',
                    }}>{shape.name}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 pr-2 mb-2">
                <label className="block text-gray-700 mb-2">حجم الخط:</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center">{fontSize}px</div>
              </div>
              
              <div className="w-full md:w-1/2 pl-2 mb-2">
                <label className="block text-gray-700 mb-2">لون الخط:</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="w-full p-1 border rounded-md h-10"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap space-x-2 space-x-reverse">
                <button
                  onClick={exportImage}
                  className="flex-1 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    تنزيل الصورة
                  </span>
                </button>
                <button
                  onClick={copyAsImage}
                  className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    نسخ الصورة
                  </span>
                </button>
              </div>
              {copySuccess && (
                <div className="mt-2 p-2 bg-gray-100 text-green-600 text-center rounded-md">
                  {copySuccess}
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="mb-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    checked={showFlowers}
                    onChange={(e) => setShowFlowers(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  />
                  تفعيل الزخارف الجمالية
                </label>
              </div>
              
              {showFlowers && (
                <div className="mt-3 bg-white p-3 rounded border">
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">نوع الزخرفة:</label>
                    <select
                      value={decorationType}
                      onChange={(e) => setDecorationType(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="flowers">زهور</option>
                      <option value="hearts">قلوب</option>
                      <option value="stars">نجوم</option>
                      <option value="diamonds">ماسات</option>
                      <option value="mixed">مختلطة</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">لون الزخرفة الثانوي:</label>
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-full p-1 border rounded-md h-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">معاينة</h3>
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                drawText();
              }}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              خلفية بيضاء
            </button>
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.fillStyle = '#f0f0f0';
                context.fillRect(0, 0, canvas.width, canvas.height);
                drawText();
              }}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              خلفية رمادية
            </button>
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                drawText();
              }}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              خلفية شفافة
            </button>
          </div>
        </div>
        <div className="relative" style={{ height: `${canvasHeight}px` }}>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="w-full h-full border rounded bg-transparent absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default FontCreator;
