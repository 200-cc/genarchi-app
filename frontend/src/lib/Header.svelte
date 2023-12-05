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
		align-items: center;
		background-color: var(--color-theme-1);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	.logo-left,
	.logo-right {
		margin: 0 10px;
	}

	.logo-left img,
	.logo-right img {
		width: 92px;
		height: 92px;
	}
</style>
