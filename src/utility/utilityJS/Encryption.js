import forge from "node-forge";
// import { AsyncStorage } from "react-native";

const salt = "#$%@#$&*(()!@#_+:{{{~~";
// 生成SHA-256散列值
// export async function sha256(data) {
// 	// 一次加盐SHA256
// 	let dataAfter = data + salt;
// 	let md = forge.md.sha256.create();
// 	md.update(dataAfter);
// 	let shaHash = md.digest().toHex();

// 	// 二次加盐SHA256
// 	let currentAccount = await AsyncStorage.getItem("currentAccount").then(
// 		currentAccount => {
// 			return currentAccount;
// 		}
// 	);
// 	let dataAfterTwice = shaHash + currentAccount;
// 	md.update(dataAfterTwice);
// 	let shaHashTwice = md.digest().toHex();

// 	return shaHashTwice;
// }

// 生成SHA-1散列值
export function sha1(data) {
	let dataAfter = data + salt;
	let md = forge.md.sha1.create();
	md.update(dataAfter);
	let shaHash = md.digest().toHex();
	return shaHash;
}

// 生成SHA-2散列值
export function sha256(data) {
	// 一次加盐SHA256
	let dataAfter = data + salt;
	let md = forge.md.sha256.create();
	md.update(dataAfter);
	let shaHash = md.digest().toHex();

	return shaHash;
}

// 从散列值中解析出需要存储比对的字段和拿来作为key以及iv的字段
export function resolveSHA(passwordSHA256) {
	let comparePartArr = [],
		encryptPartArr = [];
	passwordSHA256.split("").forEach((ele, index) => {
		if (index % 2 === 0) {
			comparePartArr.push(ele);
		} else {
			encryptPartArr.push(ele);
		}
	});
	return {
		comparePart: comparePartArr.join(""),
		encryptPart: encryptPartArr.join("")
	};
}

// 加密：
export function encrypt(data, keyHex, ivHex) {
	let keyBytes = forge.util.hexToBytes(keyHex);
	let ivBytes = forge.util.hexToBytes(ivHex);
	let cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
	cipher.start({ iv: ivBytes });
	cipher.update(forge.util.createBuffer(data));
	cipher.finish();
	let encrypted = cipher.output.toHex();

	return encrypted;
}

// 解密
export function decrypt(encryptedData, keyHex, ivHex) {
	let keyBytes = forge.util.hexToBytes(keyHex);
	let ivBytes = forge.util.hexToBytes(ivHex);
	let decipher = forge.cipher.createDecipher("AES-CBC", keyBytes);
	decipher.start({ iv: ivBytes });
	decipher.update(
		forge.util.createBuffer(forge.util.hexToBytes(encryptedData))
	);
	decipher.finish();
	return decipher.output.toString();
}
