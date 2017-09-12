App.info({
    name: 'inspetor-mups',
    description: 'Ferramenta para registrar problemas sanitários.',
    author: 'Dênnis Dantas de Sousa',
    email: 'ddspog@gmail.com'
});

App.accessRule('*://localhost:12768/*');
App.accessRule('*://inspetor-mups.herokuapp.com/*');
App.accessRule('*://ajax.googleapis.com/*');
App.accessRule('*://fonts.googleapis.com/*');
App.accessRule('*://fonts.*.com/*');

App.accessRule('data:*', { type: 'navigation' });

App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference("SplashMaintainAspectRatio", true, "android");

// Set up resources such as icons and launch screens.
App.icons({
    'android_mdpi': 'resources/icons/icon-android_mdpi.png',
    'android_hdpi': 'resources/icons/icon-android_hdpi.png',
    'android_xhdpi': 'resources/icons/icon-android_xhdpi.png',
    'android_xxhdpi': 'resources/icons/icon-android_xxhdpi.png',
    'android_xxxhdpi': 'resources/icons/icon-android_xxxhdpi.png'
});

App.launchScreens({
    'android_mdpi_landscape': 'resources/splash/splash-android_mdpi_landscape.png',
    'android_hdpi_landscape': 'resources/splash/splash-android_hdpi_landscape.png',
    'android_xhdpi_landscape': 'resources/splash/splash-android_xhdpi_landscape.png',
    'android_xxhdpi_landscape': 'resources/splash/splash-android_xxhdpi_landscape.png',
    'android_mdpi_portrait': 'resources/splash/splash-android_mdpi_portrait.png',
    'android_hdpi_portrait': 'resources/splash/splash-android_hdpi_portrait.png',
    'android_xhdpi_portrait': 'resources/splash/splash-android_xhdpi_portrait.png',
    'android_xxhdpi_portrait': 'resources/splash/splash-android_xxhdpi_portrait.png'
});