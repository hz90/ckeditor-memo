(function(d){	const l = d['he'] = d['he'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 מתוך %1",Aquamarine:"",Black:"",Blue:"","Dim grey":"","Dropdown toolbar":"סרגל כלים נפתח","Edit block":"הגדרות בלוק","Editor toolbar":"סרגל הכלים",Green:"",Grey:"","Insert paragraph after block":"","Insert paragraph before block":"",Italic:"נטוי","Light blue":"","Light green":"","Light grey":"",Next:"הבא",Orange:"",Previous:"הקודם",Purple:"",Red:"",Redo:"ביצוע מחדש","Rich Text Editor":"עורך טקסט עשיר","Rich Text Editor, %0":"עורך טקסט עשיר, %0","Show more items":"הצד פריטים נוספים",Turquoise:"",Undo:"ביטול",White:"",Yellow:""}	);l.getPluralForm=function(n){return (n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));