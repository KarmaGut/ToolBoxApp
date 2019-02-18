export function _fisherYates(arr) {
	let newArr = arr.slice();
	for (let i = 1; i < newArr.length; i++) {
		const random = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[random]] = [newArr[random], newArr[i]];
	}
	return newArr;
}

const ImageArr = [
	require("@images/profileImage_1.png"),
	require("@images/profileImage_2.png"),
	require("@images/profileImage_3.png"),
	require("@images/profileImage_4.png"),
	require("@images/profileImage_5.png"),
	require("@images/profileImage_6.png"),
	require("@images/profileImage_7.png"),
	require("@images/profileImage_8.png"),
	require("@images/profileImage_9.png"),
    require("@images/profileImage_10.png"),
    require("@images/profileImage_11.png")
];

let ImageArrNoOrder = _fisherYates(ImageArr);

export default ImageArrNoOrder;