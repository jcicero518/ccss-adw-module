import React from 'react';
import ContentLoader from 'react-content-loader';

export const ImageGrid = props => (
	<ContentLoader
		speed={2}
		width={1000}
		height={575}
		viewBox="0 0 800 575"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="537" y="9" rx="2" ry="2" width="140" height="10" />
		<rect x="14" y="30" rx="2" ry="2" width="667" height="11" />
		<rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
		<rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
		<rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
		<rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
		<rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
		<rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
		<circle cx="286" cy="536" r="12" />
		<circle cx="319" cy="535" r="12" />
		<circle cx="353" cy="535" r="12" />
		<rect x="378" y="524" rx="0" ry="0" width="52" height="24" />
		<rect x="210" y="523" rx="0" ry="0" width="52" height="24" />
		<circle cx="210" cy="535" r="12" />
		<circle cx="428" cy="536" r="12" />
	</ContentLoader>
);

ImageGrid.metadata = {
	name: 'Hassan Tijani.A',
	github: 'surepeps',
	description: 'Image Grid with Pagination',
	filename: 'ImageGrid',
};

export const ContentGrid = () => (
	<ContentLoader
		speed={2}
		width={900}
		height={500}
		viewBox="0 0 900 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#adabaf"
	>
		<rect x="4" y="10" rx="0" ry="0" width="275" height="209" />
		<rect x="295" y="10" rx="0" ry="0" width="275" height="209" />
		<rect x="584" y="10" rx="0" ry="0" width="275" height="210" />
		<rect x="6" y="255" rx="0" ry="0" width="275" height="209" />
		<rect x="296" y="255" rx="0" ry="0" width="275" height="209" />
		<rect x="584" y="256" rx="0" ry="0" width="275" height="210" />
	</ContentLoader>
);

export const FullGrid = () => (
	<ContentLoader
		speed={2}
		width={1400}
		height={500}
		viewBox="0 0 1400 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#adabaf"
	>
		<rect x="344" y="10" rx="0" ry="0" width="325" height="209" />
		<rect x="692" y="10" rx="0" ry="0" width="325" height="209" />
		<rect x="1042" y="10" rx="0" ry="0" width="325" height="210" />
		<rect x="343" y="250" rx="0" ry="0" width="325" height="209" />
		<rect x="692" y="251" rx="0" ry="0" width="325" height="209" />
		<rect x="1042" y="251" rx="0" ry="0" width="325" height="210" />
		<rect x="26" y="16" rx="12" ry="12" width="256" height="26" />
		<rect x="122" y="26" rx="0" ry="0" width="0" height="1" />
		<rect x="25" y="72" rx="12" ry="12" width="256" height="26" />
		<rect x="26" y="130" rx="12" ry="12" width="256" height="26" />
		<rect x="27" y="186" rx="12" ry="12" width="256" height="26" />
	</ContentLoader>
);
