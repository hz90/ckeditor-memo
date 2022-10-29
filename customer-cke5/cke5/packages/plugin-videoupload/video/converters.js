import first from '@ckeditor/ckeditor5-utils/src/first';
import { getViewVideoFromWidget } from './utils';


export function viewFigureToModel() {
	return dispatcher => {
		dispatcher.on( 'element:figure', converter );
	};

	function converter( evt, data, conversionApi ) {
		// Do not convert if this is not an "video figure".
		if ( !conversionApi.consumable.test( data.viewItem, { name: true, classes: 'video' } ) ) {
			return;
		}

		// Find an video element inside the figure element.
		const viewVideo = getViewVideoFromWidget( data.viewItem );

		// Do not convert if video element is absent, is missing src attribute or was already converted.
		if (!viewVideo
			|| !viewVideo.hasAttribute( 'src' )
			|| !conversionApi.consumable.test( viewVideo, { name: true } ) ) {
			return;
		}

		// Convert view video to model video.
		const conversionResult = conversionApi.convertItem( viewVideo, data.modelCursor );

		// Get video element from conversion result.
		const modelVideo = first( conversionResult.modelRange.getItems() );

		// When video wasn't successfully converted then finish conversion.
		if ( !modelVideo ) {
			return;
		}

		// Convert rest of the figure element's children as an video children.
		conversionApi.convertChildren( data.viewItem, modelVideo );

		conversionApi.updateConversionResult( modelVideo, data );
	}
}

export function modelToViewAttributeConverter( attributeKey ) {
	return dispatcher => {
		dispatcher.on( `attribute:${ attributeKey }:video`, converter );
	};

	function converter( evt, data, conversionApi ) {
		if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
			return;
		}

		const viewWriter = conversionApi.writer;
		const figure = conversionApi.mapper.toViewElement( data.item );
		const video = getViewVideoFromWidget( figure );

		viewWriter.setAttribute( data.attributeKey, data.attributeNewValue || '', video );
		//给播放器添加controls	是否显示自带的控件，比如播放按钮等
		viewWriter.setAttribute('controls',true,video);
		
		//preload	是否在页面加载后载入视频，如果设置了 autoplay 属性，则忽略该属性。
		//loop	是否循坏播放
		//poster	视频下载时显示的图像，或者在用户点击播放按钮前显示的图像
		//muted	静音
		//volume	音量
		//currentTime	视频当前播放的时长
		//duration	视频总时长
	}
}
