(function(d){	const l = d['cs'] = d['cs'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 z %1",Aquamarine:"Akvamarínová",Black:"Černá",Blue:"Modrá","Dim grey":"Tmavě šedá","Dropdown toolbar":"Rozbalovací panel nástrojů","Edit block":"Upravit blok","Editor toolbar":"Panel nástrojů editoru",Green:"Zelená",Grey:"Šedá","Insert paragraph after block":"Vložte odstavec za blok","Insert paragraph before block":"Vložte odstavec před blok",Italic:"Kurzíva","Light blue":"Světle modrá","Light green":"Světle zelená","Light grey":"Světle šedá",Next:"Další",Orange:"Oranžová",Previous:"Předchozí",Purple:"Fialová",Red:"Červená",Redo:"Znovu","Rich Text Editor":"Textový editor","Rich Text Editor, %0":"Textový editor, %0","Select all":"Vybrat vše","Show more items":"Zobrazit další položky",Turquoise:"Tyrkysová",Undo:"Zpět",White:"Bílá",Yellow:"Žlutá"}	);l.getPluralForm=function(n){return (n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));