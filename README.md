
# Magent2 starter theme
---  
  
> L'ensemble des commandes ```yarn **``` seront lancé directement à la racine du projet.  
  
  ## Préalable  
  
- Installation de [NodeJs](https://nodejs.org/en/) @V - 10.16.0  
- Installation de Yarn  
   - [MacOs](https://yarnpkg.com/fr/docs/install#mac-stable)  
   - [Debian](https://yarnpkg.com/fr/docs/install#debian-stable)  
   - [Windows](https://yarnpkg.com/fr/docs/install#windows-stable)  
   - [Autres](https://yarnpkg.com/fr/docs/install#alternatives-stable)  
- Installation de Gulp. Cet étape n'est pas obligatoire sachant que "gulp" est installé localement.  
	```
	 yarn global add gulp-cli 
	```  
---  
## Installation  
Le fonctionnement du thème repose sur l'installation des différents packages permettant de faire fonctionner convenablement les tâches GULP. Pour cela, toujours à la racine de du projet, il suffit de lancer la commande :  
```  
yarn install  
```  
  
Cette commande permet d'installer l'ensemble des packages pour le fonctionnement du thème.   
Les dépendances et les versions de module sont gérés directement par le fichier package.json et yarn.lock (fixer les versions des dépendances) !  
  
---  
  
  
## Exécution des tâches  
### Tâche global  
Lancer la commande permettant de surveiller tous les fichiers _.scss_ et lance automatiquement la compilation.  
Cette commande permettera aussi de compresser les images et créer la font icons automatiquement en cas d'ajout. Étant donné que la tâche tourne en tâche de fond, elle se relancera à chaque enregistrement d'un fichier source !  
```bash  
yarn watch  
```  
ou sinon, lancer la tâche ci-dessous qui va juste générer les assets et s'arrêter.
```bash  
yarn build  
```  
> **ATTENTION** : vérifier qu'il n'y ai aucune erreurs ou avertissements avant de continuer  
  
#### BrowserSync  
BrowserSync est un module qui va vous permettre d'actualiser et de synchroniser automatiquement vos pages web pour un développement plus rapide. Il se déclanche avec la tâche ```yarn watch:bs```. À chaque modification d'un fichier scss, il va mettre à jour le navigateur automatiquement. Ce qui va permettre de gagner du temps en développement.   
Pour le configurer, il faut aller dans **./gulp/configs.js** et modifier l'url de votre local dans l'objet theme.url  
  
**Attention à ne pas commit cette modification. Le mieux est d'avoir la même url que toute l'équipe ici : http://starter.test**  
  
---  
  
#### 1 | Procédure d'ajout d'une nouvelle feuille de style (page)  
  
**Exemple avec l'ajout de la feuille de style home.scss :**  
1. On se place dans **./web/src/scss/pages**  
2. On ajoute la feuille de style home.scss  
3. En haut de page on place les lignes si dessous, afin d'appeler les variables et les mixins:  
 
	```scss
	@import "../imports"; 
	```
	Pour infos, Le fichier \_imports.scss se trouve à la racine des sources scss. il faut bien faire attention à ce que le chemin vers ce fichier soit correct.  
4. Importer la feuille de style depuis le xml de la page home  

**Contrairement à l'ancienne version de gulp, il n'est pas obligatoire de relancer la tâche watch pour que le nouvau fichier soit pris en compte. Mais en cas de soucis, stopper puis relancer la tâche `yarn watch` ou `yarn watch:bs`**
   
> **MIXINS** : Il est possible de rajouter vos propres mixins. Pour cela, il faut les rajouter dans ./web/src/scss/utilities/_mixins.scss.  (Il ne faut surtout pas oublié de les documenter)
> Ensuite pour les utiliser, il suffit de les importer via le fichier ./web/src/scss/_imports.scss  
  
---      
#### 2 | Les fonts icons  
1. Préparer les icons en faisant attention à ne pas utiliser des svg avec des contours.  
   > Il est possible de vectoriser le contour, facielement, sur illustrator .
   
2. Placer les icons svg dans le dossier ./web/src/images/_icons.  
3. Si la tâche ```yarn watch``` ou ```yarn watch:bs``` tourne en tâche de fond au moment de l'ajout des icons, vous pouvez passer la prochaine étape alors pas besoin de faire le point 4.
5. Re-générer la police en lançant la commande ```yarn iconfont```  
  
Le script nous génère la police avec des classes du genre: ```.icon-{nomIconSVG}```. Mais aussi des variables du genre ```$icon-{nomIconSVG}``` . Pour l'utilisation des classes, ajouter les classes suivante à votre élément html: ```.icon .icon-{nomIconSVG}``` Pour l'utilisation des variables, dans votre css, il est possible d'utiliser le mixins "icon"  
  
```scss  
.monElement { 
	&::after { 
		@include icon($icon-nomIconSVG); 
	}
}  
```  
  
Attention les noms des fichiers svg doivent être unique  
  
---    
#### 3 | Les images  
Les images stockées dans le thème sont toutes compressées avant leur utilisation. Pour cela, toutes les images sont placées dans **./web/src/images** et ensuite compressées grâce à un script puis déplacer vers le dossier **./web/images**.  
  
Pour l'utilisation du script:  
1. Préparer les images avec les bonnes dimensions.  
2. Placer les images dans **./web/src/images**. Il est possible de créer des dossiers pour organiser les images. Il ne faut surtout pas ajouter d'images dans le dossier **./web/src/images/\_icons**, celui-ci contient les svg qui serviront pour la génération de l'iconfonts (vu précedement).  
3. Si la tâche **watch** est en cours au moment de l'ajout des images, alors pas besoin de faire la prochaine étape. Les images seront compressées automatiquement à l'ajout.  
4. Lancer la commande `yarn images` et vérifier que votre image passe bien dans le terminal.
---  
