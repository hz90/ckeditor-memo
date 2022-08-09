 const imageConf = {
    upload: {
        //可以限制上传文件扩展名
        types: ['png', 'jpeg']
    },
    styles: [
        'full', 'alignLeft', 'alignCenter', 'alignRight'
    ],
    resizeOptions: [
        {
            name: 'resizeImage:原尺寸',
            label: '原尺寸',
            value: null
        },
        {
            name: 'resizeImage:25',
            label: '25%',
            value: '25'
        },
        {
            name: 'resizeImage:50',
            label: '50%',
            value: '50'
        },
        {
            name: 'resizeImage:75',
            label: '75%',
            value: '75'
        }
    ],
    toolbar: [
        // 'imageStyle:full',
        // 'imageStyle:side',
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
        '|',
        'resizeImage',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        'linkImage'
    ],
};

export default imageConf;