<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2a25f624f9a6b7939979fd09dcf6bb87
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Abraham\\TwitterOAuth\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Abraham\\TwitterOAuth\\' => 
        array (
            0 => __DIR__ . '/..' . '/abraham/twitteroauth/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2a25f624f9a6b7939979fd09dcf6bb87::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2a25f624f9a6b7939979fd09dcf6bb87::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
