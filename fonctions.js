import { auth, signOut, db, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, doc, getDoc, setDoc } from './initbdd.js';

 // Toggle du menu mobile
document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});



// Références aux éléments du DOM
const userNameElement = document.getElementById('userName');
//const logoutButton = document.getElementById('logoutButton');
//const myaccount = document.getElementById('myaccount');
//const userNameElementMobile = document.getElementById('userNameMobile');
const logoutButtonMobile = document.getElementById('logoutButtonMobile');
const myaccountMobile = document.getElementById('myaccountMobile');




     // Fonction de connexion
     window.login = function() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

                // Récupérer tous les champs requis
                const requiredFields = document.getElementById('loginContainer').querySelectorAll('input[required]');

                // Boucle sur chaque champ requis
                requiredFields.forEach(field => {
                    // Si le champ est vide ou null, ajouter la classe 'border-red-500'
                    if (!field.value) {
                        field.classList.add('border-red-500');
                        return;
                    } else {
                        // Sinon, retirer la classe si elle y est déjà (dans le cas d'une validation précédente)
                        field.classList.remove('border-red-500');
                    }
                });



        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Connexion réussie
                const user = userCredential.user;
                console.log('Utilisateur connecté:', user);
                showCalculator();
                console.log('Utilisateur connecté:', user.email);
                //userNameElement.textContent = `${user.email}`;
                //logoutButton.style.display = 'inline-block';
            })
            .catch((error) => {
                console.error('Erreur de connexion:', error);
                //alert('Erreur de connexion: ' + error.message);
                showLogin();
            });
    }


    // Fonction pour valider le mot de passe
    function validatePassword(password) {
        // Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
}
     // Fonction d'inscription
     window.register = function() {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const prenom = document.getElementById('registerFirstName').value;
        const nom = document.getElementById('registerLastName').value;
        const birthDate = document.getElementById('registerBirthDate').value;
        

        // Validation des champs
        if (!email || !password || !prenom || !nom || !birthDate) {
               
                // Récupérer tous les champs requis
                const requiredFields = document.getElementById('registerContainer').querySelectorAll('input[required]');

                // Boucle sur chaque champ requis
                requiredFields.forEach(field => {
                    // Si le champ est vide ou null, ajouter la classe 'border-red-500'
                    if (!field.value) {
                        field.classList.add('border-red-500');
                    } else {
                        // Sinon, retirer la classe si elle y est déjà (dans le cas d'une validation précédente)
                        field.classList.remove('border-red-500');
                    }
                });
                 return;
           
           
            }

            if (!validatePassword(password)) {
                alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
                return;
            }



        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inscription réussie
                const user = userCredential.user;
                // Ajouter les informations supplémentaires à Firestore
                return setDoc(doc(db, 'utilisateurs', user.uid), {
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    birthDate: birthDate
                });
            })
            .then(() => {
                console.log('Utilisateur inscrit et données ajoutées à Firestore');
            })
            .catch((error) => {
                console.error('Erreur d\'inscription:', error);
                alert('Erreur d\'inscription: ' + error.message);
            });
    }


    // Fonction pour afficher le formulaire de connexion
    window.showLogin = function() {
        document.getElementById('loginContainer').style.display = 'block';
        document.getElementById('registerContainer').style.display = 'none';
    }

    // Fonction pour afficher le formulaire d'inscription
    window.showRegister = function() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('registerContainer').style.display = 'block';
    }

    function showCalculator() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('calculatorContainer').style.display = 'block';
    }




function loadHTML(elementID, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementID).innerHTML = data;
        })
        .catch(error => console.log('Erreur lors du chargement du fichier:', error));
}



// Fonction pour afficher le nom de l'utilisateur
async function displayUserInfo(user) {
    if (user) {
        try {
            const docRef = doc(db, 'utilisateurs', user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                userNameElement.textContent = `${userData.prenom} ${userData.nom}`;
                //logoutButton.style.display = 'inline-block';
                //myaccount.style.display = 'inline-block';
                // userNameElementMobile.textContent = `${userData.prenom} ${userData.nom} ${userData.email}`;
                logoutButtonMobile.style.display = 'inline-block';
                myaccountMobile.style.display = 'inline-block';
                
                document.getElementById('authContainer').style.display = 'none';
                //document.getElementById('calculatorContainer').style.display = 'block';
                const container = document.getElementById('calculatorContainer');
                const styles = {
                    display: 'block',
                    opacity: 1,
                };

                Object.assign(container.style, styles);

            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
    } else {
        userNameElement.textContent = '';
        //logoutButton.style.display = 'none';
        // myaccount.style.display = 'none';
        //userNameElementMobile.textContent = '';
        logoutButtonMobile.style.display = 'none';
        myaccountMobile.style.display = 'none';
        document.getElementById('authContainer').style.display = 'block';
        //document.getElementById('calculatorContainer').style.display='none';
        const container = document.getElementById('calculatorContainer');
        const styles = {
            display: 'block',
            opacity: 0.5,
        };

        Object.assign(container.style, styles);
    }
}

// Écouter les changements d'état d'authentification
onAuthStateChanged(auth, (user) => {
    displayUserInfo(user);
    loadHTML('authContainer', 'auth-container.html');
});
    


    // Gestion de la déconnexion
/*logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Utilisateur déconnecté');
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion:', error);
    });
});*/
logoutButtonMobile.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Utilisateur déconnecté');
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion:', error);
    });
});

