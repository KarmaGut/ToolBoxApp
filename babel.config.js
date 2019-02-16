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
                    "@Register": "./src/components/Register",
                    "@Splash": "./src/components/Splash",
                    "@Memo": "./src/components/Memo",
                    "@PwManagement": "./src/components/PwManagement",
                    "@Thoughts": "./src/components/Thoughts",
                    "@TodoList": "./src/components/TodoList",
                    "@redux": "./src/redux",
                    "@actions": "./src/redux/actions",
                    "@reducers": "./src/redux/reducers",
                    "@utility": "./src/utility",
                    "@utilityComp": "./src/utility/utilityComp",
                    "@utilityJS": "./src/utility/utilityJS",
                    "@routes": "./src/routes",
                    "@SignInRoutes": "./src/routes/SignInRoutes",
                    "@MainRoutes": "./src/routes/MainRoutes",
                    "@SubMainTab": "./src/routes/MainRoutes/SubMainTab",
                    "@App": "./src/App",
                    "@images": "./images",
                    "@languages": "./src/languages",
                    "@Icons": "./Icons"
                }
			}
		]
	]
};
