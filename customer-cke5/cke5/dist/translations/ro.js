(function(d){	const l = d['ro'] = d['ro'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 din %1",Aquamarine:"Acvamarin",Black:"Negru",Blue:"Albastru","Dim grey":"Gri slab","Dropdown toolbar":"Bară listă opțiuni","Edit block":"Editează bloc","Editor toolbar":"Bară editor",Green:"Verde",Grey:"Gri","Insert paragraph after block":"Inserează un paragraf după bloc","Insert paragraph before block":"Inserează un paragraf înaintea blocului",Italic:"Cursiv","Light blue":"Albastru deschis","Light green":"Verde deschis","Light grey":"Gri deschis",Next:"Înainte",Orange:"Portocaliu",Previous:"Înapoi",Purple:"Violet",Red:"Roșu",Redo:"Revenire","Rich Text Editor":"Editor de text","Rich Text Editor, %0":"Editor de text, %0","Select all":"Selectează-le pe toate","Show more items":"Arată mai multe elemente",Turquoise:"Turcoaz",Undo:"Anulare",White:"Alb",Yellow:"Galben"}	);l.getPluralForm=function(n){return (n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));