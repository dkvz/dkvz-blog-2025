<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient-clouds"
  },
  title: "A propos"
})

</script>

<template>
  <article class="content-card content-card--page-card trans-left">
    <h2>C'est quoi ce blog?</h2>
    <p>Il y a les choses importantes, puis les choses moins importantes.</p>
    <p>Puis il y a vous et moi, et des questions. Beaucoup de questions.</p>
    <p>Puis y a ce blog.</p>

    <h2>Non sérieusement c'est quoi ce blog?</h2>
    <p>C'est aussi une expérience foireuse de recyclage de mes connaissances en développement de trucs et machins web et
      moins-web puisque ce blog est entièrement de ma conception.</p>
    <p>Ajoutons ça à la non-relative inexistence de mes talents artistiques et on a quelque chose qu'on sait pas trop si
      c'est moderne ou pas mais ça sent plus le café des sports que le vinyle neuf.</p>

    <hr>

    <p>On compte déjà plusieurs itérations (<b>qui fonctionnent toujours!</b>), par exemple:</p>
    <ul>
      <li><a href="https://oldsite-2018.dkvz.eu" target="_blank">La version "sans framework"</a> &mdash; J'en suis pas
        hyper
        fier mais ça m'aura appris beaucoup sur les API de base de manipulation du DOM</li>
      <li><a href="https://oldsite.dkvz.eu" target="_blank">La version Polymer</a> (me demandez pas ce que c'est
        Polymer)</li>
    </ul>

    <p>Aujourd'hui j'ai juste un vieux site en Nuxt. Peut-être que ça fonctionnera encore dans deux ans, peut-être pas.
      C'est ça aussi le web, on se marre bien.</p>

    <p>L'API qui sert les articles a changé deux fois pour l'instant:</p>
    <ul>
      <li><a href="https://github.com/dkvz/dorade-blog-engine" target="_blank">Truc infernal en Java d'il y a 10 ans</a>
      </li>
      <li><a href="https://github.com/dkvz/dkvz-blog-backend" target="_blank">Truc de poilu écrit en Rust</a> &mdash;
        Utilisé actuellement et avec carrément <b>deux</b> étoiles sur Github. Et ouais.</li>
    </ul>

    <div class="card-panel z-depth-3 article-image center-image" style="max-width: 800px">
      <iframe src="/wp-content/stuff/bandit/index.html" style="max-width: 800px; width: 100%;" height="600"></iframe>
      <div class="image-legend">Je sais pas ce que ça fait ici</div>
    </div>

    <h2>Tu crois que les gens lisent vraiment tes articles de 80 pages?</h2>
    <p>Non. Je n'écris pas spécialement pour être lu.</p>
    <p>Mes motivations sont multiples, en particulier apprendre des nouvelles choses, cristalliser les connaissances —
      Parce qu'expliquer via texte ou un autre média implique de vérifier les fondamentales et construire en partant de
      là plutôt que de prendre le risque de raconter plus de bêtises que prévu.</p>
    <p>J'aime bien essayer de me tenir à la discipline d'écrire des trucs régulièrement aussi parce que la discipline
      c'est le truc le plus important de la vie si tu veux progresser dans des trucs.</p>
    <p>Je tiens tout de même à souligner qu'on trouve de temps en temps des commentaires de gens contents sous mes
      articles, et c'est pas moi qui les ai écrit.</p>

    <h2>Attends il est où l'avertissement sur les cookies?</h2>
    <p>Il n'y a pas de cookies sur mon site. Par contre je vous conseille <a
        href="http://orteil.dashnet.org/cookieclicker/" target="_blank">Cookie Clicker</a>.</p>

    <p>J'ai des données anonymisées de statistiques que je vais jamais voir, à durée de conservation indéterminée.
      Paraît que c'est cool de prévenir alors je vous le dis.</p>

  </article>
</template>
