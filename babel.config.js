module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				cwd: "babelrc",
				alias: {
                    "@components": "./src/components",
                    "@SignIn": "./src/components/SignIn",
                    "@Splash": "./src/components/Splash",
                    "@redux": "./src/redux",
                    "@actions": "./src/redux/actions",
                    "@reducers": "./src/redux/reducers",
                    "@utility": "./src/utility",
                    "@utilityComp": "./src/utility/utilityComp",
                    "@utilityJS": "./src/utility/utilityJS",
                    "@routes": "./src/routes",
                    "@SignInRoutes": "./src/routes/SignInRoutes",
                    "@MainRoutes": "./src/routes/MainRoutes",
                    "@App": "./src/App",
                    "@images": "./images",
                    "@languages": "./src/languages"
                }
			}
		]
	]
};
