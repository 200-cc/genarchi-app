<script>
	import logo from '$lib/images/logo-SIGL.png';
	import team from '$lib/images/logo-200cc.png';
</script>

<header>
	<div class="logo-left">
		<img src={logo} alt="SIGL" />
	</div>
	<h1>Quotes App by 200cc</h1>
	<div class="logo-right">
		<img src={team} alt="200cc" />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		background-color: #333;
		color: #fff;
	}

	.logo-left,
	.logo-right {
		margin: 0 10px;
	}

	.logo-left img,
	.logo-right img {
		width: 100px;
		height: 100px;
	}
</style>
