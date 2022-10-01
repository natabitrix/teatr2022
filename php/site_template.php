<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use Bitrix\Main,
	Bitrix\Main\Page\Asset;
	
$context = Main\Application::getInstance()->getContext();
$request = $context->getRequest();
$server = $context->getServer();
$protocol = (CMain::IsHTTPS()) ? "https://" : "http://";


$rsSites = CSite::GetByID(SITE_ID);
$arSite = $rsSites->Fetch();

$curPage = $APPLICATION->GetCurPage(false);
$curDir = $APPLICATION->GetCurDir(true);
$fullPage = $APPLICATION->GetCurPage(true);

$curURL = $protocol.$arSite["SERVER_NAME"].$curPage;
$siteName = str_replace('&quot;','',$arSite["NAME"]);
$siteUrl = $protocol.SITE_SERVER_NAME;

define("PATH_TO_404", "/404.php");

global $USER,$homePage;
if ($curPage === '/')
	$homePage = true;


//$arrPage = explode('/',trim(str_replace(array('.html','.php'),'',$curPage),'/'));
//$contacts = $curPage=='/contacts.php' ? true : false;
//$skazochniki = (strpos($curPage,'/about/skazochniki/')!==false && strpos($curPage,'.html')!==false) ? true : false;
//$repertuar = strpos($dir,'/repertuar/')!==false ? true : false;

$ERROR404 = defined('ERROR_404') && ERROR_404=="Y" ? "Y" : "N";

?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<title><?$APPLICATION->ShowTitle('title')?><?if(!$homePage):?> | <?=$siteName?><?endif?></title>
	<?$APPLICATION->ShowHead();?>


	<meta name="proculture-verification" content="e2eb49ea590f0df09cf3fc344d1e4e30" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="theme-color" content="#df4e0f">

	<link rel="canonical" href="<?=$siteUrl.$curPage?>">

	<meta property="og:title" content="<? myShowProperty("og_title"); ?>">
	<meta property="og:description" content="<?$APPLICATION->ShowProperty("description")?>">
	<meta property="og:url" content="<?=$curURL.$page?>">
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="Устинка">
	<meta property="og:image" content="<?=$site_url?><?myShowProperty('og_image');?>">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:locale" content="ru_RU">



	<?
	Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . "/js/app.min.js");
	Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . "/css/style.min.css");
	?>


	<script data-skip-moving="true">
	var curPage = '<?=$APPLICATION->GetCurPage(false)?>';
	var admin = <?if($USER && $USER->IsAdmin()):?>true<?else:?>false<?endif?>;
	</script>


</head>

<body <?$APPLICATION->ShowViewContent('curPageClasses');?> <?if($ERROR_404=="Y"):?>error404<?endif?>">
<?include($_SERVER['DOCUMENT_ROOT'].'/local/php_interface/admin_panel.php');?>

#WORK_AREA#

</body>
</html>