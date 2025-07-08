# **ΠΤΥΧΙΑΚΗ ΕΡΓΑΣΙΑ**

## **Τίτλος:**

**Monuma: Διαδραστική Βάση Δεδομένων Μνημείων της Θεσσαλονίκης με Δυνατότητα Συμμετοχής Χρηστών**

---

### **Φοιτητής:**

Αλέξανδρος Παπαδοπουλος

### **ΑΕΜ:**

2654

### **Επιβλέπων Καθηγητής:**

Διονύσιος Πολίτης

### **Τμήμα:**

Τμήμα Πληροφορικής, Σχολη Θετικών Επιστημών Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης

### **Ημερομηνία Υποβολής:**

Σεπτέμβριος, 2025

---

## **Περίληψη**

Η παρούσα πτυχιακή εργασία παρουσιάζει την ανάπτυξη της διαδικτυακής εφαρμογής Monuma, η οποία λειτουργεί ως διαδραστική βάση δεδομένων για τα μνημεία της Θεσσαλονίκης. Η εφαρμογή επιτρέπει στους χρήστες να ανακαλύπτουν, να προσθέτουν και να επεξεργάζονται πληροφορίες για τα μνημεία της πόλης, αξιοποιώντας σύγχρονες τεχνολογίες διαδικτύου και βάσεων δεδομένων. Μέσω διαδραστικού χάρτη, συστήματος λιστών και κοινωνικών λειτουργιών, ενισχύεται η συμμετοχή της κοινότητας στη διατήρηση και ανάδειξη της πολιτιστικής κληρονομιάς. Η εργασία περιγράφει τον σχεδιασμό, την υλοποίηση και την αξιολόγηση της εφαρμογής, αναδεικνύοντας τα οφέλη και τις προοπτικές της για την τοπική κοινωνία και τους επισκέπτες της Θεσσαλονίκης.

---

## **Abstract**

This thesis presents the development of the Monuma web application, which serves as an interactive database for the monuments of Thessaloniki. The application enables users to discover, add, and edit information about the city's monuments, utilizing modern web and database technologies. Through an interactive map, list management, and social features, the platform encourages community participation in the preservation and promotion of cultural heritage. The thesis describes the design, implementation, and evaluation of the application, highlighting its benefits and prospects for the local community and visitors of Thessaloniki.

---

## **Περιεχόμενα**

1. [Εισαγωγή](#bookmark=id.3b4egd1kp1fo)

2. [Σκοπός και Στόχοι](#bookmark=id.9t95qrutwhux)

3. [Σχετική Έρευνα & Υφιστάμενες Λύσεις](#bookmark=id.a5yp8hi1dq05)

4. [Ανάλυση Απαιτήσεων](#bookmark=id.5gkmx0f69d37)

5. [Σχεδιασμός Συστήματος](#bookmark=id.qfj4x2ptc03h)

   1. [Αρχιτεκτονική](#bookmark=id.8f3v4jeklg25)

   2. [Βάση Δεδομένων](#bookmark=id.nf17dcz7grf9)

   3. [Frontend](#bookmark=id.a6ohxk7wna2o)

   4. [Backend](#bookmark=id.rm4jw3td1jwm)

6. [Υλοποίηση](#bookmark=id.pkmx1dmz9iva)

   1. [Τεχνολογίες](#bookmark=id.vifggtkd6i32)

   2. [Λειτουργικότητα](#bookmark=id.9g8vd1i3e7pc)

   3. [Διαχείριση Χρηστών](#bookmark=id.fqvxltr2g0ft)

   4. [Διαχείριση Μνημείων](#bookmark=id.6aao36eedod0)

   5. [Λίστες & Αλληλεπίδραση Χρηστών](#bookmark=id.xvgpyzams5s0)

   6. [Χάρτης & Αναζήτηση](#bookmark=id.exvyb2m4u26y)

7. [Δοκιμές & Αξιολόγηση](#bookmark=id.x4w8opiu52di)

8. [Συμπεράσματα & Μελλοντική Εργασία](#bookmark=id.cqscxtpm2ffw)

9. [Βιβλιογραφία](#bookmark=id.hbczinizsnqe)

10. [Παραρτήματα](#bookmark=id.m1j9nv3ajper)

---

## **Εισαγωγή**

Η πόλη της Θεσσαλονίκης αποτελεί ένα ζωντανό μουσείο ιστορίας και πολιτισμού, με μνημεία που μαρτυρούν τη διαχρονική της πορεία από την αρχαιότητα έως σήμερα. Η διατήρηση, ανάδειξη και προσβασιμότητα αυτών των μνημείων αποτελεί σημαντικό παράγοντα για την πολιτιστική ταυτότητα της πόλης και την εκπαίδευση των πολιτών και επισκεπτών της.

Στην εποχή της ψηφιακής πληροφορίας, η αξιοποίηση της τεχνολογίας για την καταγραφή, οργάνωση και διάχυση της γνώσης σχετικά με τα μνημεία είναι πιο επίκαιρη από ποτέ. Η παρούσα πτυχιακή εργασία έχει ως στόχο τη δημιουργία μιας διαδραστικής διαδικτυακής πλατφόρμας, με την ονομασία Monuma, η οποία επιτρέπει στους χρήστες να ανακαλύψουν, να προσθέσουν και να επεξεργαστούν πληροφορίες για τα μνημεία της Θεσσαλονίκης, αξιοποιώντας σύγχρονες τεχνολογίες διαδικτύου και βάσεων δεδομένων.

Η εφαρμογή Monuma σχεδιάστηκε με στόχο να ενισχύσει τη συλλογική μνήμη και να προάγει τη συνεργασία της κοινότητας, αξιοποιώντας τις δυνατότητες των σύγχρονων τεχνολογιών διαδικτύου και βάσεων δεδομένων. Μέσα από ένα φιλικό και προσβάσιμο περιβάλλον, οι χρήστες μπορούν να συμβάλουν στη διατήρηση και ανάδειξη της πολιτιστικής κληρονομιάς της πόλης, καθιστώντας το Monuma ένα ζωντανό, εξελισσόμενο εργαλείο για όλους.

---

## **Σκοπός και Στόχοι**

Ο κύριος σκοπός της παρούσας εργασίας είναι η σχεδίαση και υλοποίηση μιας καινοτόμου διαδικτυακής εφαρμογής που θα λειτουργεί ως διαδραστική βάση δεδομένων για τα μνημεία της Θεσσαλονίκης, δίνοντας έμφαση στη συμμετοχή και τη συνεργασία των χρηστών. Η εργασία αποσκοπεί στη δημιουργία ενός ψηφιακού οικοσυστήματος όπου η πληροφορία δεν είναι στατική, αλλά διαμορφώνεται και εμπλουτίζεται διαρκώς από την ίδια την κοινότητα.

Οι επιμέρους στόχοι της εργασίας περιλαμβάνουν:

Τη συλλογή, οργάνωση και παρουσίαση πληροφοριών για τα μνημεία της πόλης με φιλικό και προσβάσιμο τρόπο.

Τη δυνατότητα στους χρήστες να προσθέτουν νέα μνημεία, να επεξεργάζονται υπάρχουσες εγγραφές και να συμβάλλουν στη διαρκή ενημέρωση της βάσης δεδομένων.

Την ενσωμάτωση διαδραστικού χάρτη για την εύκολη αναζήτηση και εντοπισμό μνημείων με γεωγραφικά κριτήρια.

Τη δημιουργία λιστών μνημείων από τους χρήστες, με δυνατότητα κοινοποίησης και αλληλεπίδρασης με άλλους χρήστες (π.χ. ακολούθηση λιστών).

Την υλοποίηση μηχανισμών αναζήτησης με βάση το κείμενο ή/και ετικέτες (tags).

Τη διασφάλιση της ασφάλειας και της ορθότητας των δεδομένων μέσω κατάλληλων μηχανισμών ελέγχου και επικύρωσης.

Η υλοποίηση αυτών των στόχων αναμένεται να προσφέρει ένα χρήσιμο εργαλείο τόσο για τους κατοίκους και επισκέπτες της Θεσσαλονίκης, όσο και για ερευνητές, εκπαιδευτικούς και φορείς πολιτισμού.

---

## **Σχετική Έρευνα & Υφιστάμενες Λύσεις**

Η ανάγκη για την καταγραφή, ανάδειξη και προστασία των μνημείων μιας πόλης έχει οδηγήσει, τα τελευταία χρόνια, στην ανάπτυξη πληθώρας ψηφιακών εφαρμογών και διαδικτυακών πλατφορμών, τόσο σε τοπικό όσο και σε διεθνές επίπεδο. Οι λύσεις αυτές ποικίλλουν ως προς το εύρος, τη λειτουργικότητα και το κοινό στο οποίο απευθύνονται, καλύπτοντας ανάγκες ενημέρωσης, εκπαίδευσης, τουρισμού και πολιτιστικής διαχείρισης.

Στην Ελλάδα, εφαρμογές όπως το "Μνημεία της Ελλάδας" και το "Clio Muse" προσφέρουν πληροφορίες για μνημεία και πολιτιστικά σημεία ενδιαφέροντος, κυρίως με τη μορφή στατικών πληροφοριών, φωτογραφιών και προκαθορισμένων διαδρομών. Παράλληλα, αρκετοί δήμοι και πολιτιστικοί φορείς διατηρούν δικές τους βάσεις δεδομένων ή ιστοσελίδες με πληροφορίες για τα μνημεία της περιοχής τους, οι οποίες όμως συχνά δεν επιτρέπουν την ενεργή συμμετοχή των πολιτών στη διαμόρφωση του περιεχομένου.

Σε διεθνές επίπεδο, πλατφόρμες όπως το "Wikipedia" και το "Wikidata" επιτρέπουν τη συλλογική καταγραφή και επεξεργασία πληροφοριών για μνημεία, ενώ εφαρμογές όπως το "Google Maps" και το "TripAdvisor" παρέχουν δυνατότητες αναζήτησης και αξιολόγησης σημείων ενδιαφέροντος από τους χρήστες.

Ωστόσο, οι περισσότερες από τις παραπάνω λύσεις είτε δεν εστιάζουν αποκλειστικά στη Θεσσαλονίκη, είτε δεν προσφέρουν τη δυνατότητα στους χρήστες να προσθέτουν και να επεξεργάζονται οι ίδιοι τα δεδομένα με εύκολο και διαδραστικό τρόπο. Επιπλέον, η οργάνωση των μνημείων σε λίστες και η κοινωνική διάσταση της αλληλεπίδρασης μεταξύ των χρηστών είναι περιορισμένη ή ανύπαρκτη.

Η εφαρμογή Monuma έρχεται να καλύψει αυτό το κενό, προσφέροντας μια εξειδικευμένη, ανοιχτή και διαδραστική πλατφόρμα για τα μνημεία της Θεσσαλονίκης, με έμφαση στη συμμετοχή, τη συνεργασία και την αξιοποίηση της συλλογικής γνώσης της κοινότητας.

---

## **Ανάλυση Απαιτήσεων**

Η επιτυχής υλοποίηση της εφαρμογής Monuma προϋποθέτει τον σαφή καθορισμό τόσο των λειτουργικών όσο και των μη λειτουργικών απαιτήσεων του συστήματος. Στην ενότητα αυτή παρουσιάζονται οι βασικές απαιτήσεις που προέκυψαν μετά από ανάλυση των αναγκών των χρηστών και των στόχων της εργασίας.

4.1 Λειτουργικές Απαιτήσεις

Οι λειτουργικές απαιτήσεις περιγράφουν τις βασικές δυνατότητες που πρέπει να προσφέρει η εφαρμογή:

**Εγγραφή και Σύνδεση Χρηστών:**

Οι χρήστες πρέπει να μπορούν να δημιουργούν λογαριασμό, να συνδέονται και να διαχειρίζονται το προφίλ τους.

**Προσθήκη Νέου Μνημείου:**

Οι εγγεγραμμένοι χρήστες έχουν τη δυνατότητα να προσθέτουν νέα μνημεία στη βάση δεδομένων, συμπληρώνοντας σχετικές πληροφορίες (όνομα, περιγραφή, τοποθεσία, φωτογραφίες, κατηγορίες, εποχή κ.λπ.).

**Επεξεργασία Υφιστάμενων Μνημείων:**

Οι χρήστες μπορούν να προτείνουν αλλαγές ή να επεξεργάζονται υπάρχουσες εγγραφές μνημείων.

**Αναζήτηση και Φιλτράρισμα Μνημείων:**

Η εφαρμογή πρέπει να παρέχει δυνατότητα αναζήτησης μνημείων με βάση το όνομα, τις ετικέτες (tags), την κατηγορία ή/και τη γεωγραφική τοποθεσία μέσω διαδραστικού χάρτη.

**Δημιουργία και Διαχείριση Λιστών Μνημείων:**

Οι χρήστες μπορούν να δημιουργούν προσωπικές λίστες μνημείων, να τις επεξεργάζονται και να τις κοινοποιούν.

**Αλληλεπίδραση με Λίστες Άλλων Χρηστών:**

Δυνατότητα ακολούθησης λιστών άλλων χρηστών και προβολής των σχετικών μνημείων.

**Επισκόπηση και Προβολή Πληροφοριών Μνημείων:**

Οι χρήστες μπορούν να βλέπουν αναλυτικές πληροφορίες για κάθε μνημείο, συμπεριλαμβανομένων φωτογραφιών, περιγραφής, τοποθεσίας στον χάρτη και σχετικών λιστών.

**Διαχείριση Εγκρίσεων:**

Οι προτάσεις για νέα μνημεία ή αλλαγές σε υπάρχοντα πρέπει να εγκρίνονται από διαχειριστή ή μέσω μηχανισμού επικύρωσης πριν δημοσιευτούν.

4.2 Μη Λειτουργικές Απαιτήσεις

Οι μη λειτουργικές απαιτήσεις αφορούν την ποιότητα, την απόδοση και τη συντήρηση του συστήματος:

**Ευχρηστία**:

Η διεπαφή χρήστη πρέπει να είναι φιλική, απλή και προσβάσιμη από χρήστες με διαφορετικό επίπεδο εξοικείωσης με την τεχνολογία.

**Απόδοση**:

Η εφαρμογή πρέπει να ανταποκρίνεται άμεσα στις ενέργειες των χρηστών, με ελάχιστο χρόνο φόρτωσης και αναζήτησης.

**Ασφάλεια**:

Τα προσωπικά δεδομένα των χρηστών πρέπει να προστατεύονται, ενώ η πρόσβαση σε λειτουργίες διαχείρισης να περιορίζεται σε εξουσιοδοτημένους χρήστες.

**Επεκτασιμότητα**:

Το σύστημα πρέπει να μπορεί να υποστηρίξει μελλοντική επέκταση, τόσο σε επίπεδο λειτουργιών όσο και σε όγκο δεδομένων.

**Συμβατότητα**:

Η εφαρμογή πρέπει να λειτουργεί ορθά σε όλους τους σύγχρονους browsers και σε διαφορετικές συσκευές (υπολογιστές, tablets, smartphones).

**Διαθεσιμότητα**:

Η υπηρεσία πρέπει να είναι διαθέσιμη και λειτουργική το μεγαλύτερο δυνατό διάστημα, με ελάχιστο χρόνο διακοπής.

4.3 Χρήστες και Ρόλοι

**Απλός Χρήστης:**

Μπορεί να αναζητά, να βλέπει πληροφορίες, να δημιουργεί/επεξεργάζεται μνημεία και λίστες.

**Διαχειριστής:**

Έχει επιπλέον δικαιώματα για την έγκριση ή απόρριψη προτάσεων, τη διαχείριση χρηστών και την εποπτεία του συστήματος.

4.4 Περιπτώσεις Χρήσης (Use Cases)

* Εγγραφή/Σύνδεση χρήστη  
* Προσθήκη νέου μνημείου  
* Επεξεργασία μνημείου  
* Αναζήτηση μνημείων  
* Δημιουργία/επεξεργασία λίστας  
* Ακολούθηση λίστας άλλου χρήστη

---

## **Σχεδιασμός Συστήματος**

### **Αρχιτεκτονική**

Η εφαρμογή Monuma βασίζεται σε μια τριεπίπεδη αρχιτεκτονική (Three-Tier Architecture), η οποία διαχωρίζει ξεκάθαρα τις ευθύνες των επιμέρους τμημάτων και επιτρέπει την ευέλικτη ανάπτυξη και συντήρηση του συστήματος.

**Παρουσίαση Επιπέδου (Presentation Layer):**

Το frontend της εφαρμογής, υλοποιημένο με τη χρήση του React.js framework, είναι υπεύθυνο για την παρουσίαση των δεδομένων στους χρήστες και τη διαχείριση της διεπαφής χρήστη. Το React επιτρέπει τη δημιουργία επαναχρησιμοποιήσιμων components, τη διαχείριση της κατάστασης της εφαρμογής και την αποδοτική ενημέρωση του DOM.

**Επιχειρηματική Λογική (Business Logic Layer):**

Το backend της εφαρμογής, υλοποιημένο με Node.js και Express.js, είναι υπεύθυνο για την επεξεργασία των αιτημάτων των χρηστών, την εφαρμογή των κανόνων επιχειρηματικής λογικής και τη διαχείριση της επικοινωνίας με τη βάση δεδομένων. Το Express.js παρέχει ένα ευέλικτο framework για τη δημιουργία RESTful APIs.

**Επιπέδου Δεδομένων (Data Layer):**

Η βάση δεδομένων MySQL είναι υπεύθυνη για την αποθήκευση και ανάκτηση των δεδομένων της εφαρμογής. Η επιλογή της MySQL βασίζεται στη σταθερότητα, την αξιοπιστία και την ευρύτατη υποστήριξη που προσφέρει για εφαρμογές διαδικτύου.

**Εξωτερικές Υπηρεσίες:**

Η εφαρμογή αξιοποιεί επίσης εξωτερικές υπηρεσίες όπως το Cloudinary για την αποθήκευση και διαχείριση των φωτογραφιών των μνημείων, καθώς και το Google Maps API για την ενσωμάτωση διαδραστικών χαρτών.

### **Βάση Δεδομένων**

Η σχεδίαση της βάσης δεδομένων βασίζεται στην ανάλυση των απαιτήσεων και στο μοντέλο οντοτήτων-σχέσεων (Entity-Relationship Model). Η βάση δεδομένων αποτελείται από τους παρακάτω βασικούς πίνακες:

![Schema][image1]

Πίνακας Users:

Περιέχει πληροφορίες για τους χρήστες της εφαρμογής, συμπεριλαμβανομένων του email, του ονόματος, του κωδικού πρόσβασης (κρυπτογραφημένου) και του ρόλου (απλός χρήστης ή διαχειριστής).

Πίνακας Monuments:

Αποθηκεύει τις πληροφορίες για τα μνημεία, συμπεριλαμβανομένων του ονόματος, της περιγραφής, των συντεταγμένων γεωγραφικού πλάτους και μήκους, της εποχής, της κατηγορίας και του URL της κύριας φωτογραφίας.

Πίνακας Lists:

Περιέχει τις λίστες μνημείων που δημιουργούν οι χρήστες, συμπεριλαμβανομένων του ονόματος, της περιγραφής, του ID του δημιουργού και της κατάστασης δημοσιότητας (δημόσια ή ιδιωτική).

Πίνακας List\_Monuments:

Πίνακας σύνδεσης (junction table) που συνδέει τις λίστες με τα μνημεία, επιτρέποντας τη σύνδεση πολλών μνημείων με μια λίστα και πολλών λιστών με ένα μνημείο.

Πίνακας Comments:

Αποθηκεύει τα σχόλια των χρηστών για τα μνημεία, συμπεριλαμβανομένων του περιεχομένου, του ID του χρήστη και του ID του μνημείου.

Πίνακας Categories:

Περιέχει τις διαθέσιμες κατηγορίες μνημείων (π.χ. αρχαιολογικός χώρος, εκκλησία, μουσείο κλπ.).

Η σχεδίαση της βάσης δεδομένων εξασφαλίζει την ακεραιότητα των δεδομένων μέσω κατάλληλων περιορισμών (constraints), ευρετηρίων (indexes) και σχέσεων μεταξύ των πινάκων.

**Μηχανισμοί Ακεραιότητας και Ασφάλειας**

Για τη διασφάλιση της ακεραιότητας των δεδομένων, έχουν οριστεί κατάλληλα foreign keys μεταξύ των πινάκων, ενώ χρησιμοποιούνται indexes για τη βελτίωση της απόδοσης στις αναζητήσεις. Επιπλέον, εφαρμόζονται unique constraints όπου απαιτείται (π.χ. μοναδικό email χρήστη), ενώ η ασφάλεια των δεδομένων ενισχύεται με περιορισμούς πρόσβασης στη βάση και ασφαλή διαχείριση των credentials. Σε μελλοντική επέκταση, μπορούν να προστεθούν triggers για την αυτόματη ενημέρωση σχετικών πινάκων ή τον έλεγχο ακεραιότητας σε σύνθετες λειτουργίες.

### **Frontend**

Το frontend της εφαρμογής βασίζεται στη βιβλιοθήκη React.js και ακολουθεί την αρχιτεκτονική των components. Η δομή των components οργανώνεται ως εξής:

**Βασικά Components:**

App.js: Κύριο component που διαχειρίζεται τη δρομολόγηση και την κατάσταση της εφαρμογής

Navbar.jsx: Πλοήγηση της εφαρμογής με μενού και αναζήτηση

MonumentCard.jsx: Παρουσίαση πληροφοριών μνημείου σε μορφή κάρτας

MapMarkers.jsx: Διαχείριση των markers στον χάρτη

**Σελίδες (Pages):**

HomeScreen.jsx: Αρχική σελίδα με αναζήτηση και προτεινόμενα μνημεία

MonumentsScreen.jsx: Λίστα όλων των μνημείων με φίλτρα

MonumentDetailScreen.jsx: Λεπτομερής προβολή μνημείου

ListsScreen.jsx: Διαχείριση λιστών χρήστη

UserProfileScreen.jsx: Προφίλ και ρυθμίσεις χρήστη

**Modals και Forms:**

NewMonumentForm.jsx: Φόρμα προσθήκης νέου μνημείου

CreateListModal.jsx: Δημιουργία νέας λίστας

Login.jsx/SignUp.jsx: Φόρμες εγγραφής και σύνδεσης

Η διαχείριση της κατάστασης της εφαρμογής γίνεται μέσω του Context API του React και custom hooks, ενώ η επικοινωνία με το backend πραγματοποιείται μέσω HTTP requests.

**User Experience & Προσβασιμότητα**

Ιδιαίτερη έμφαση δόθηκε στη φιλικότητα της διεπαφής και στην προσβασιμότητα της εφαρμογής. Χρησιμοποιήθηκαν semantic στοιχεία HTML και ARIA attributes για τη διευκόλυνση χρηστών με αναπηρίες, ενώ το responsive design εξασφαλίζει ομαλή εμπειρία σε όλες τις συσκευές. Επιπλέον, εφαρμόστηκαν best practices για contrast, μεγέθη γραμματοσειρών και εστίαση (focus) στα διαδραστικά στοιχεία.

**State Management & Custom Hooks**

Η διαχείριση της κατάστασης της εφαρμογής υλοποιείται με custom React hooks και Context API, επιτρέποντας την κεντρική διαχείριση της αυθεντικοποίησης, των λιστών και των μνημείων, καθώς και την εύκολη επαναχρησιμοποίηση της λογικής σε διαφορετικά components. Ενδεικτικά, hooks όπως useAuthModals, useFetchMonuments και useListDetail διαχειρίζονται την κατάσταση και τα δεδομένα σε όλη την εφαρμογή.

### **Backend**

Το backend της εφαρμογής υλοποιείται με Node.js και Express.js, ακολουθώντας την αρχιτεκτονική MVC (Model-View-Controller). Η δομή του backend οργανώνεται ως εξής:

**Routes:**

userRoute.js: Διαχείριση χρηστών (εγγραφή, σύνδεση, προφίλ)

monumentRoute.js: Διαχείριση μνημείων (CRUD operations)

listRoute.js: Διαχείριση λιστών και αλληλεπίδρασης χρηστών

commentRoute.js: Διαχείριση σχολίων

**Services:**

userService.js: Επιχειρηματική λογική για τη διαχείριση χρηστών

monumentService.js: Επιχειρηματική λογική για τη διαχείριση μνημείων

listService.js: Επιχειρηματική λογική για τη διαχείριση λιστών

**Middleware:**

middleware.js: Έλεγχος αυθεντικοποίησης και εξουσιοδότησης

fileUpload.js: Διαχείριση ανεβάσματος αρχείων

Configuration:

db.js: Σύνδεση με τη βάση δεδομένων

cloudinaryConfig.js: Ρύθμιση Cloudinary για φωτογραφίες

Το backend παρέχει RESTful API endpoints που επικοινωνούν με το frontend μέσω HTTP requests και responses σε μορφή JSON. Η ασφάλεια εξασφαλίζεται μέσω JWT tokens για την αυθεντικοποίηση και κατάλληλων middleware για την επικύρωση των δεδομένων.

**Ασφάλεια & Επεκτασιμότητα Backend**

Για την προστασία του backend εφαρμόζονται μηχανισμοί validation όλων των εισερχόμενων δεδομένων και καταγραφή (logging) των αιτημάτων για λόγους auditing και debugging. Η αρχιτεκτονική του backend είναι modular, επιτρέποντας την εύκολη προσθήκη νέων λειτουργιών χωρίς να επηρεάζεται ο υπάρχων κώδικας. Επιπλέον, εφαρμόζονται CORS policies και προστασία από κοινές επιθέσεις (SQL injection, XSS).

## **Υλοποίηση**

Η υλοποίηση της εφαρμογής Monuma βασίστηκε στις προδιαγραφές που καθορίστηκαν στα προηγούμενα κεφάλαια και ακολούθησε σύγχρονες πρακτικές ανάπτυξης λογισμικού. Στην ενότητα αυτή παρουσιάζεται η τεχνολογική στοίβα που χρησιμοποιήθηκε, οι βασικές λειτουργίες της εφαρμογής και η υλοποίηση των επιμέρους τμημάτων.

### **Τεχνολογίες**

Η επιλογή των τεχνολογιών βασίστηκε σε κριτήρια όπως η ευέλικτη ανάπτυξη, η εκτεταμένη κοινότητα υποστήριξης, η καλή απόδοση και η συμβατότητα με τους στόχους της εφαρμογής.

**Frontend Technologies:**

* React.js (v18): Για τη δημιουργία της διεπαφής χρήστη και τη διαχείριση των components  
* JavaScript (ES6+): Για τη λογική της εφαρμογής  
* CSS3 & Tailwind CSS: Για το styling και την responsive design  
* React Router: Για τη διαχείριση της πλοήγησης και των routes  
* Axios: Για τις HTTP requests προς το backend

**Backend Technologies:**

* Node.js: Runtime environment για το server-side JavaScript  
* Express.js: Web framework για τη δημιουργία του REST API  
* PostgresSQL: Σχεσιακή βάση δεδομένων για την αποθήκευση των δεδομένων  
* JWT (JSON Web Tokens): Για την αυθεντικοποίηση και εξουσιοδότηση χρηστών  
* bcrypt: Για την κρυπτογράφηση των κωδικών πρόσβασης

**External Services:**

* Cloudinary: Για την αποθήκευση και διαχείριση των φωτογραφιών  
* Google Maps API: Για την ενσωμάτωση διαδραστικών χαρτών  
* Multer:\*\* Για τη διαχείριση ανεβάσματος αρχείων


**Development Tools:**

* Git & GitHub: Για έλεγχο εκδόσεων και συνεργατική ανάπτυξη  
* npm: Για τη διαχείριση των dependencies  
* ESLint: Για τη διασφάλιση της ποιότητας του κώδικα

### **Λειτουργικότητα**

Η εφαρμογή Monuma προσφέρει ένα ευρύ φάσμα λειτουργιών που καλύπτουν όλες τις απαιτήσεις που καθορίστηκαν στην ανάλυση απαιτήσεων.

**Αρχική Σελίδα (Homepage)**  
Η αρχική σελίδα παρέχει μια εισαγωγή στην εφαρμογή με αναζήτηση μνημείων, προτεινόμενα μνημεία και γρήγορη πρόσβαση στις βασικές λειτουργίες. Οι χρήστες μπορούν να αναζητήσουν μνημεία με βάση το όνομα ή τις ετικέτες, να περιηγηθούν σε προτεινόμενα μνημεία και να έχουν πρόσβαση στη λειτουργία πλοήγησης. Τελος εμφανίζονται ενδεικτικά οι τελευταίες δημόσιες λίστες που έχουν δημιουργηθεί από τους χρήστες.

**Σύστημα Αυθεντικοποίησης (Login)**  
Η εφαρμογή υλοποιεί ένα πλήρες σύστημα αυθεντικοποίησης με εγγραφή νέων χρηστών, σύνδεση υφιστάμενων χρηστών και διαχείριση προφίλ. Οι κωδικοί πρόσβασης κρυπτογραφούνται με bcrypt πριν αποθηκευτούν στη βάση δεδομένων, ενώ η διαχείριση των sessions γίνεται μέσω JWT tokens.

### **Διαχείριση Χρηστών**

**Εγγραφή Χρήστη:**  
Η διαδικασία εγγραφής περιλαμβάνει την επικύρωση των δεδομένων εισόδου, την κρυπτογράφηση του κωδικού πρόσβασης και τη δημιουργία του λογαριασμού στη βάση δεδομένων. Η εφαρμογή επιτρέπει στους χρήστες να εισάγουν βασικές πληροφορίες όπως όνομα, email και κωδικό πρόσβασης.

**Σύνδεση Χρήστη:**  
Η διαδικασία σύνδεσης περιλαμβάνει την επικύρωση των credentials, τη δημιουργία JWT token και την αποθήκευση της κατάστασης σύνδεσης. Οι χρήστες παραμένουν συνδεδεμένοι μέχρι να αποσυνδεθούν ή να λήξει το token.

**Διαχείριση Προφίλ:**  
Οι χρήστες μπορούν να επεξεργαστούν τις πληροφορίες του προφίλ τους, συμπεριλαμβανομένων του ονόματος, της φωτογραφίας προφίλ και άλλων προσωπικών πληροφοριών. Η εφαρμογή παρέχει φόρμες επεξεργασίας με επικύρωση δεδομένων.

### **Διαχείριση Μνημείων**

**Προσθήκη Νέου Μνημείου:**  
Η διαδικασία προσθήκης νέου μνημείου περιλαμβάνει τη συμπλήρωση φόρμας με όλες τις απαραίτητες πληροφορίες. Οι χρήστες μπορούν να εισάγουν όνομα, περιγραφή, τοποθεσία (συντεταγμένες), κατηγορία, εποχή και φωτογραφίες. Η εφαρμογή επιτρέπει την ανέβασμα πολλαπλών φωτογραφιών που αποθηκεύονται στο Cloudinary.

**Επεξεργασία Μνημείου:**  
Οι χρήστες μπορούν να προτείνουν αλλαγές σε υπάρχοντα μνημεία μέσω ειδικής φόρμας επεξεργασίας. Οι προτεινόμενες αλλαγές αποθηκεύονται και περιμένουν έγκριση από διαχειριστή πριν εφαρμοστούν.

### **Λίστες & Αλληλεπίδραση Χρηστών**

**Δημιουργία Λίστας:**  
Οι χρήστες μπορούν να δημιουργήσουν προσωπικές λίστες μνημείων, προσθέτοντας όνομα, περιγραφή και επιλέγοντας αν η λίστα θα είναι δημόσια ή ιδιωτική. Η εφαρμογή παρέχει εύκολη διαχείριση των λιστών με δυνατότητα προσθήκης/αφαίρεσης μνημείων.

**Ακολούθηση Λιστών:**  
Οι χρήστες μπορούν να ακολουθήσουν δημόσιες λίστες άλλων χρηστών, λαμβάνοντας ειδοποιήσεις για νέα μνημεία που προστίθενται. Η εφαρμογή παρέχει σελίδα με όλες τις ακολουθούμενες λίστες και τα σχετικά μνημεία.

### **Χάρτης & Αναζήτηση**

**Διαδραστικός Χάρτης:**  
Η εφαρμογή ενσωματώνει διαδραστικό χάρτη βασισμένο στο Google Maps API, που επιτρέπει στους χρήστες να βλέπουν τα μνημεία σε γεωγραφική αναπαράσταση. Κάθε μνημείο εμφανίζεται ως marker στον χάρτη με popup που περιέχει βασικές πληροφορίες.

**Σύστημα Αναζήτησης:**  
Η εφαρμογή παρέχει προηγμένο σύστημα αναζήτησης που επιτρέπει στους χρήστες να αναζητήσουν μνημεία με βάση:

* Όνομα μνημείου  
* Ετικέτες (tags)  
* Κατηγορία  
* Γεωγραφική περιοχή  
* Εποχή

**Φίλτρα και Ταξινόμηση:**  
Οι χρήστες μπορούν να εφαρμόσουν φίλτρα για να περιορίσουν τα αποτελέσματα αναζήτησης

### **Ασφαλεια**

Η εφαρμογή υλοποιεί πολλαπλά επίπεδα ασφάλειας:

* Κρυπτογράφηση κωδικών πρόσβασης με bcrypt  
* JWT tokens για την αυθεντικοποίηση  
* Επικύρωση δεδομένων εισόδου  
* Προστασία από SQL injection  
* CORS configuration για ασφαλή cross-origin requests

---

## **Δοκιμές & Αξιολόγηση**

(Περιγραφή δοκιμών, αποτελέσματα, αξιολόγηση χρηστικότητας)

---

## **Συμπεράσματα & Μελλοντική Εργασία**

(Συμπεράσματα, προτάσεις για μελλοντική επέκταση)

---

## **Βιβλιογραφία**

(Λίστα βιβλιογραφικών αναφορών)

---

## **Παραρτήματα**

---

### **Οδηγίες Μορφοποίησης (για Word):**

* **Γραμματοσειρά:** Times New Roman ή Arial, μέγεθος 12

* **Διάστιχο:** 1.5

* **Περιθώρια:** 2.5 εκ. σε όλες τις πλευρές

* **Ευθυγράμμιση:** Πλήρης (justify)

* **Αρίθμηση σελίδων:** Κάτω μέρος, κέντρο ή δεξιά

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGtCAYAAADK0QrrAACAAElEQVR4Xuy9WZAd1b2veR46OqKj32/0Q7/0Wz+cG/ee8PG957jxEPZpY9w+2OaCMT6AwJYxg68HJqGJEjqIQUKABAhJCE1oQgMSGtEsgeYSktAslYTmWWhAEkI4TmTXt6r+W2uvzL2ratfeVZk7fxXxxcpcuXLtIdfO9eXKrPX/u//z//q/IyGEEEIIUT3+7uLFi5EQQgghhKgef/e3v/0tEkIIIYQQ1UOCJYQQQghRZaoiWN98843IKOGxFEIIIUTnqViwwo76xg2RNcJjGB5jIYQQQlRGhwUrSaq+vnGjGdJvoutf3xApx44Vxy1JtsJjLoQQQoiO0SHBCuWKDto67a+u34iuXf86uvqVSDPXWo8Tx+umcLWIliRLCCGEqA4VCVaLXLWMVplUXbn2dfRlM5evXndcuiLShh0bjhPHq0W4vi6MavmSFR57IYQQQrSfdgtWKFeMgNBBf3mtpdO+2NyBf3H5WnS+mXOXrjZDKtLFVXd8OE4Xr3zljhuixagWxzMcyQrbgBBCCCHaR4cEy78tSKfMSAgd9bmLV6OT5y5FR09/ER05eV6kmKOnvoiOnbngjhfH7ZIb0brujqfdLpRgCSGEEJ2jAsH6xt1WYuSDzvnsxSvRE5O3Rf/21trozldXioxw39sbopfm7najWhxHjmfLKNbNW4VhGxBCCCFE+2iXYPm3Bxnl4NYgt5e+uPxVdPzsxegXLy+J/uHhESJj3DtifXTi7KXowpcttws5rhxfCVZ6aPndcUya5ffrr0UO4Fin8fdnbTF8v6J+SWtbzArtFiy7PcgoB6Md3Bo8e/Gqu+3003+fG+u8Rfq5c+gKd8uQ57OKR7F0mzAN8P1fv94svlevRpcuXYrFuRL1B8f5ypUr0VdffZWqzo33wnv68ssv1RZzAseZ433t2jV3/MM2Idqmg4LVcnuQZ3YY9TjTLFiHTpyTYGUUBOtwsyCfuXDV/ZOCf5tQgtX9cAXJCW7sgo1Rj5dnipzw7LglrnNDrtPQsXEeQK7odHuNWhh7v6J+eXTYh9GFCxecZKk/6DgVCNYNdzsJwTp94Up08NhZCVZGKQhWsyhzPPmnBQRaz2F1P9apnT9/PnbcRP0zZelmN3KJZIVto6tB8hhVe3nKytj7FPXP7f0nRZcvX06F7GeNDgmW/fegPX/FyEcpwTp48kJ09fo3Ub9xyxz8hWVqAbJAunHPsWj0gsbYdnETBIsRSESZ42mCpeewuh++ezrY06dPx46bqH/GLtjgRi+R7LBtdDV0rHSwgyYtj71PUf/c+swEN3rJiHrYNkR5OixY/gPuLYJ1pqRgHTt32aVg4sMfwsX67DW7XQrIEOlDr33oxMzKks8fwgTs45e1ekzgvvnbf7jUBMvfbnWxfdT8RpcP7ENd9l5ZJo/yVh954WfMOjaCZYLFcbXpGiRY3YsJ1qlTp2LHTdQ/785f76QGweru3yEdK7csn39vWex9ivoHweI2oQSr49RUsCYv/8wJCsJkgmXyRL4JTihNVobUxIftSBPLCBrbTbAstXpJfcEKpc0XPKCs5Vs5H/4oF+ZnHQlWejHBOnnyZOy4ifpHgiXSggSrcjotWJ8fL32LELGxUSf/1p3JTChYNsLEyBdlkwSLfPtLEizK8ldOsCzdfeSse23bx8ry549g8acRLNGVlBMsfyQW+OuK2+H8VuziRtSWrAiWnVftPB5uF9lHglU5nRIsOuZSgpUlwtGvvIBgMc0Gn1+ClS7aEqxtB04VLkpsmeNozzvahYJdQPijtVaWdZMz28fKWh7lgHUbPbaLHUaow/cmqkNWBcvW7S5B2J74szao9pMNJFiVI8HKMRKs9NKWYNFpMbUGWAdmFwg28msjsqUEKxzZNXGy1+HP9vMFi20mZ+F7E9Uhq4LFMu2QdmSplfXbC20p6XEMkT4kWJUjwcoxEqz00h7BsmcbTYBs9IpOLRQs9uPPH+0KBYuUdf6sLl+wbBRi/oZ9LrWRX1F9siJY/iMVrPvtx55ptXX+KGOPifjyJdKLBKtyJFg5RoKVXsoJlqh/siJYov6RYFWOBCvHSLDSiwQr30iwRFqQYFWOBCvHSLDSiwQr30iwRFqQYFVOVQTrnVUHo8/PXxEZ47nZuyVYKUWClW8kWCItSLAqR4KVYyRY6UWClW8kWCItSLAqR4KVYyRY6UWClW8kWCItSLAqR4KVYyRY6cUXrPC4ifrn+NkvUidYQABqkT8kWJVRt4K1eM2maMgbI2L5HWHX0TPRb+7r4VLL+5cf31pUZtrchdGIse9F99x7f2z/tCPBShenT58pLEuw8o0ES6QJCVZl1EywEBNk5O///u+dhJAiKpv3HnLLyA/rzzz7nFtHiCgHbGPd9v/TE08X9qFulv/pn7/jlilvddg2q4/y7Mt7oTz1mSBZOZYp56+TUs4XLPs8oWD1HvDvLh393tTorbETY99DtXhx8CvR6sbPoq0HjkYLVnzs8sZPnd783k5Hvfv2c+t9+z/r0qYzl6Jnnxvolim7u/kYhfVBHgTrm2/KE5YvR7hvSFi+Lfx9d+3e59KVq9a25kmw8owES6QJCVZl1FSwTKiQHJMnE6NQYPwyJlhW1sSHfXwZom7bB9iHesj3BYt1ex2/TrD3ZO/BZA4+3Xe4sJ+JlS9YDS+8HB04e9ktz1iwJNp78ovY91AtPli0NOr1TG8nWI8++mj0dK9nnGCxPGvBYlfGBGv2R8uit98d55bzKFhr1myIljd/7l279kV79ja1i737bjJn7qJowaJl0dp1G6OPP1nnWP1x+7F9ShGWn79gaUG03ps0M/pP/+n/iFatXhstXbYqmjtvQey4ifpHgiXShASrMrpEsBAdkyDybRQrSbBIkRhfsHwpI9+/bZckWKRJgmV1mfTZa9o2q8/28d+fjYr5gjVv+SfR2+MmRe/P+6ggWrVi0aq10bQ586INu/YXjWDtOHQyGjNxsls3wer3bEO0telItHLT1twJ1rLlHxeNDMEN2m8J/HJXr12Lrly9GquzkrrCOtqqa/7CpdHU9z9wyxs2bnTf/5UrV6MTJ9I5gmW/SUi6HX/3v90bHTz3ZfT7R/8Y21e0TT0L1q233lpY/vzzz6OnnnqqaPudd97p0rfffju2r+geJFiVUTPByhLhSFl7GfTKa9Hk2fNj+Vmh3gRr+/ZdLo0JzI0SBGK0bn1jrM5EIQrrSagrSbLaWxeC9fWNGyUFi4sAuy1uI7rksc1ub7Ps32K3iwX/4iLp1rmN4NpFiX8Ln3Vb9n8zv3/ksZhg7T52tuYXHWmBi5/PPj8eLV27yY0sW/5TT/eK1m/f67Yz8vzx5u0unwuixj0Hy178dKdgzfpgfjR95oeF9XKC9Z3vfMeltANLw+WNze154cKFjhEjRhQEi3179OgRE6zZs2e79MyZM9GaNWtirylK8+KLL7rjdOrUqeiFF15w3yH5b775ppMktts66YEDB6JJkya5cqtXr47VZ4SCdfnylVi7EXEkWOdvdkTWSeWFehMsOoaYxLRKC8LiE8oR5Y8cOR6rsz11FeoLJKvSujZsaBGsL69cKSlYgNTY7W3kx0Ze7Ra7XTD4ZXzBKnfrnHzDRpj9kSrK23o4gnXXPb9x6f7TF6Of/PT/i73/eoOROp6DnN8sTAgWt+0Rqr/85a/RY489Fu09cb5IsJ57/oXoldeHd7lgHT58zN16nv3hAvdbSWLCxPcL5adM+6BFtmZ8GE2eMtP9E0bY8fqCdfr06YJQIVLWlhAqEyzKsm4jV+EI1k9/+lOXnj171n2P4euJ8nAM/vSnP7lnN/n+YPr06U6oWN60aZMrZ4I1bNiwgoiVE6xJk6e7dmDtZPrMeS3Ls+dHCxYujdas3dgpNm/eFjUd+LzuRskkWDmm3gRr7brGkhLDZ/JJEqOWz3yzvqTRpvbUlSRY7a0L1m/Y0HyiaZ9g+c8yhnmhYJHabfOkW+ekts/YaTMTBYvUyrM/r0WeCRbPLZLmQawMbsXvP3Uh6tOvf2wEi+cj+UcUEyyWP1q9Lho46MUuFayx46bE8pJoavq8uc2djhYvWVHIa2sEC0ly7aY5tTwkq0ePHq7DnzBhQkywyKccIuYLFvl/+MMfYq8j2gcyhZyShiNYJ06ciJYuXVpYJx08eLATq0OHDpUVrLZGsPwRz87y0eKbbS/rSLByTL0J1ooVn8QEy5eYr65/XSBJjMoKVjvq8mWtrGCVqevxcWtb3lerYB1vPimGx03UP9UUrPcmzYjldYRygiXyQShYN5rPUX4b2d90MNZuOsPevU2xvCwiwcox5QTr66/jwlEpJhe1rmv58hbBSholQl7e+GBddHu/9zotWOy//NOmorpMSq2u8D2Wq+v0F5cLdfUYtam1vq+bT2wSrLxSTcFqbNway+sIEiwRClbI0WPxxys6A/8FHuZlEQlWjgkF69KV683Hl06/WLDKSU0pwv2SCPcpRbhfKUywnpjyWfTA6Mbo8cnbokEf7ooGzdndzK7o98M/ciLTd8rmaOCs7dHAD7ZHA2Zui56esCHqPWlT1H/a1qjf1C3NaQsst/Cpl37avP+n0R9HrmytqyXvZhm/fPvqeua9TYW6EKyW/M3RMxM3RH8dtSx23ET9U03ButRcT5jXESRYoqsFa+euPbG8LCLByjG+YN39bw8WBOuaf9vLu+XVXjkKyxZGlDpYV1iurboQrD+9ty1avedMbKTo4uUvY7f15s1fXPEIVlhXtW4RPjCqsaW+r3WLMM9US7AuXLgUy+soEizR1YJ15Gh16+suJFg5xgTr7/7X/z36u//lf4v+n+/9MLrSfHwLgsVtrxJCE7aRm22lhAx58hHWVaq+knUlQBkE67EJW4te024Drlu/uSA0sGvP/pgUlRUsrz6/HsOvK+kzdbQuCVa+kWCJNCHBqgwJVsbhX8Q/P3Ohbc7F5yRCsA6fOB/98/f/32j56vXRqjXroyvXmgWr+Rhfd89ifd0iDYYnM6FAtLSTQCS8fQsCUmldQX1Jdc1dvCaa8Mnh2D689r79BwqyBUuWrira3+1zI1mw/M/j1+HT1mdKqqtUfS6/VbD4L8JTF6+InHHm/IXUCRadbNjxivqHdijBqgwJVtb5/PP2E+xrgnX6wtXo3KVr0cUvv3KCdfWr64VbVmHH7wtEKYkI5QaKRmfaEJKYjLSzrlFz1kYf7z2TuO+lS1/eFKpmlixZHXt98uNtP15XIkFd4XfTobputHxWm2g0POGJ+ueLLzSCJdKDBKsy6k6wtuw/4rD1vzzZMm+Pz/e///3osb88Hu07dSG2LXO0ylPPnj1d+vjjj7v04YcfLmxjTppygnWq+TiaYH157XqzZF13o1jXmkUrdgusVSaSJKJIIFolwfb3/9suFKOwriQR8esKsbr+OHZjdKm5bfqSY3VcvHT5Zn3NzJw1NyZESR1ZUl2l8MuG9XS4vhs3Q+WEJztR/0iwRJqQYFVGzQRr8LA3o1tuucXx0COPRbf+5DaXP3z0uy6PUBrvTJpW2M768g1bCqntP+mDuS4lj/1Zfqb/ACdR7Mf6rEVLC8smWPY6oWDd98Bvo3cnT49Gjp9UJGJphFiDpE8+/bSbkJDJCkmLJidslagNGzZEn332WfTEE0+4dWbs3bVrV5uC9avXPo7ebT5+oWBddZLVMpIViowvE8XtJFmK2nooPKwrJiDtqOuDTcei376zKSY6hhvB8gRm5qx5sTKlOrJ4uWI5CreF+1dSlwkWMzKHJzuRHY4fPx4dO3asLEwAGe4nwRJpQoJVGTUTrOdeHOxSJAZpQoJYtxTxQYJYJg0Fy/ZHpiw1aTKRoqxts3VfsOx17D0xcjV9/uLo7nt+E703c07sPacNE6z5y1dHC1euKStY27Zti37/+98XBGvv3r1Rjx49osWLF7cpWPe8tT76zVsbontHbIjue3tTMxui+9/eGP1r34nRfSPWu6kD+O+2B0ZvctMftLC5wIPv3Fy+ub3R7cO+wDQE97y2vGxd1FOyLsq31kddd744t6iuXtO2R8tXfJIoPIBg+eu+YPntPGz7xb+Dtgn3KUW4Xwi/t6tXJVhZBkGy32dbhPtKsESakGBVRpcLlgkTAuQLFiliRflSgkUdJlVJguVjYsXIlr2nH/3Lv0Qj3p0QTZj+Qez9phETLEJqsNyWYJH+4Ac/KAgWKaEQygnW1NVNTrBeW7A3uvDlNXdsv7z6lRvBenrUwujcxStlR51MKgpiYKMxre3FRp16jV4UNe49Vraum+0tXpc/gkVdM1dvj9UVCpbfhi9f/rJofdYH8xLbeZjXXfBeJFgdY8qUKS4dN26cSy1Q8JEjR6JevXpFEydOdB3Fq6++Gq1atSoaPny4275y5UqXMppE+uSTT0YDBgxwyytWrHChR4BAuYwSE1KE+nbu3Fko//zzz7tlQr/Y+zHBamhocK/HMiFM+vTp494b63PmzMm0YD399NOxvBALyyLKM3r0aJeOGjXKpVu3bnUpF819+/Z1y0OHDnXtl3ZI+7B9li1b5tKXXnrJtU2CPdPW2U65o0ePur6AtjZjxgxXhvZu5dl3z5490eHDh2PvCyRYldHlguXfIgwFi9uId9x5V0nBImVfyoWCZdv8ESy7nWjvqefDj7hRrPC9ppHpHy6I+jcMcLHLEKzPPj9eVrD4cZDy4yPdv39/QbR27NhRUrDcLcKV2b9FaIJl+4bvrZ4E69NPP43uuuuu6LbbbnPLnBRp6++++65bJsCwbWeZfWw9rKueaGxsdCnfAylCRCw2BIt1YuIRi40OZ/ny5YWOH2Hyg93SeXF7nXJvvPGGy9u9e7dL33777Wj27NlFr8tvz5b5ndG5sewL1v33318kWA8++GDmBYvvzNod0BZpb6Tku0DXzecfK8P3zbLabDLcbSCdPHmyS03WaZfIEOcCzuVNTU2ujbLNBOu5555z6XvvvedSLhq2bNkSjRkzxq1v3rzZpePHj3e/A3tN29+YOnVq0bohwaqMmgmW6BoOfn6oIFltEuxbbw+5+4IVtuF6EyxLX3755UJHR4dEZ8W6BXVtaO7crTODUleo9QKShfAcOHDAdUIIDYKFGNHZWAcEdErk04HNnDmz0PEwSmAjWOxv5REeyjKaxfL69etdPuJBPVbORM0XLDpGeP/996PevXu7EWckLsuCBTaCZYJl+b4Y0UbDVG02zsWLF53I89we7djaERcKtEe7UADaNm2O74r9kC7E/vXXX3ftl2XkyUQMkKTt27e775plficsczF+/vx5V6bUaKMEqzIkWDmm3qZpyKtgNTSfZFlnVCSps/LX652BAwe61K7c582bV+iYxo4d667sERc6Mn8Ei3KMEpw7d851SpRlm41gAbcYSbk1SB2MEJCyj402HDx40H3fLPuCRcrxsREs1nv06FG3ggUNraJkZXzBYhvLarPFIN+ktF+OPxJO+5w1a5YTKf55CQHzR7BouyxPmjTJXUDQnvj+/BEs6qKtsYxk0Wa5CEH6eQ3qZhuvE74nkGBVhgQrx/iCdf7SV9HFKy2CldWJRi0WYVgX1JNgia7lnXfeieUlQadFB2jrJlhr164tjCIzcuWv09llWbBEukGMFi1aFMtPYuTIkbE8vx4JVseRYOUYC5VjgkUswqyHyilVlwRLdAdFt+jLEO4nwRJpQoJVGRKsHOMHezbBynqw57AOQ4IlsoQES6QJCVZlVEWwJn1yMHZARPp54cObgsXxNMH66jqjVy3HPBScsG2UItwviXCfUoT7lWLFCgmWqA8kWCJNSLAqQ4KVY0LB4rhec89eFQtW2B46SiVSVYpydUmwRL0gwRJpQoJVGRKsHFNOsFrkqvITe3cgwRL1ggRLpAkJVmVIsDLOoUPtnwcr3FeCVVwmTZ9XgpVvJFgiTUiwKkOClXFMnpgzhnTatGkuJcSHbbOZ3MN9JVjFZdL0eSVY+UaCJdKEBKsyMidY4WR29QQxovr37+9mlGZGXmbqtdmfmQyOyePeeustx+nTp90+JlHElCK1YM/M/mvbLBZh+HoSrOIyafq8Eqx8I8ESaUKCVRk1Eyxm62WGXmbqZd3iS/mCRBmLG8Zsv+FMvpS1lJAK4f71iIXy8EN6+DNL833YTNFgEkWZe++9N3r88cfdOjHAevbsKcFqRYIlugP7fbZFuJ8ES6QJCVZl1FywGlpDIphIIVEmW1bGAoBaGQgFy+rJo2AxO7SF4iglWBbb7OGHH3br+/btc6Nfd955pwTrbxIsUTl+nMFyIEUbNmworIehcsBiEdp61kPlNLSel0U6QYw++uijWH4S3BkJ8/x6JFgdp1sEi2WkilhgJlg2QsWyBQolJT+PguXfIpwyZYo7CZ84caKkYBGwk5SwCKTEmbJtyFbSSVyCVVwmTZ+3nGDZiC6/D5btN8TvimUuYGy7XczYul/P1KlT3X5WhpR1lu03ar9Lf5vt418c+e+J37jl+3XUGgLkktq5htvk/FYsFiG33nlviMvy5cuLYhFSzoLrMhrMxQrlLBYhsQtJ+U3Onj276HUJmmvL/M4ItMuyL1i/+MUv3LLFIrzjjjvqRrD47jjOLJNn7YPU2gHfNcsWYzBsN1be6khqr/XO4sWLXTp58mSX2kU17ZI4mZwL6A+ampqKYhGSEric1PoPYm76sQg3b97s0vHjxxeCmvv7G5wT/HVDglUZNROs9mInd3/0SrSfo0ePFkSqLcJ9JVjFZdL0edsSLEu5kLEOjk4pKXCuiRCwbPXYb46UfWwb69YJWqdo2/wAvLyeva7/nvxybA/ffy1BshAeLjDohBAaBAsxorPxR4bplMinA5s5c2ah4xk6dGg0YMAAt8z+Vh7hoezZs2fd8vr1610+4uGPcpmo+YJFp7hgwYKCYHFBRIdaD4JFynH2L4xJrR2x7Kcm3uxr7cV/VKRUe613CLiMyBPMmXZs7YgLBdqjXSgAbZs2x3fIfrQvxJ4Lc9ovy8iTiRggScS+5PfMMr8TlmmL58+fd2XsoiNEglUZ3S5YovuQYBWXSdPn7YhgNbR2cjzvmCRY/rqPL1ikVoZ66ehs/3CbjaDaxVH4nvw6gffov24tGThwoEvtyn3evHmFjonnGLmyR1zoyPwRLMoxSkDAZv+ZRxvBgokTJ7p0586drg5GCEjZx0YbDh48WPh+wluEffv2LQgW608++WRdCJYda3ve1s8P2xaptRvKhO2FdleqveYBbh+T0n45/oyk0j5nzZrlRIrHRRAwfwSLtsvypEmT3AUE7Ynv0B/Boi7aGstIFm2WixBGxHgN6mYbrxO+J5BgVYYEK8dIsIrLpOnzlhMs0bW88847sbwk6LToAG3dBKs9hHVlRbBEukGMeGwkzE9i5MiRsTy/HglWx5Fg5RgJVnGZNH1eCVZ90J6JgP1bP4YES6QJCVZlSLByjASruEyaPq8EK99IsESakGBVhgQrx0iwisuk6fNKsPKNBEukCQlWZUiwcowEq7hMmj6vBCvfSLBEmpBgVYYEK8dIsIrLpOnzSrDyjQRLpAkJVmVIsHKMBKu4TJo+rwQr39ChpU2w7F/5Rb6gHUqwKiMTgsWkaUyqZthMt6JzSLCKy6Tp80qw8o1GsESakGBVRiYEiwn55s+fX1gfPHhwrEw90tDQEL3wwgvuRMukiDZh4/PPP+8mPbSZfoEJ4pBPZotmfevWrS5lYkPbP6xfglVcJk2fV4KVbyRYIk1IsCqjZoKFDPgz+UJDa9gOC5dg+RaKw7ZbjCqbERnBslhKkBfBGj16dGHGXZuhm2CynHgJ7uwL1ty5cwvLjPjZ945gMSu1BEuCJbqecM6rUoT7SbBEtQnbXCnC/UCCVRk1FSxbtthUiJXJlAmUn9fQKli27gsWAYtZXrZsWfS73/0u9nr1CIJ1+vRpNxrFZIQmWGwjVEIpwUKuiElFfCkEizhVr732Wqx+CVZxmTR9XglW9rGZ3NeuXVvovLgw8tcJW5LUqUmwRLWhndGPWtsj4PnevXsL64SRIkWmwn0lWJVRU8Gio/eDgCYJFtuITVVOsAjKumbNGsf/+B//w8X7Cl+vHuH74HYgI1KvvvqqC/pJPoE/iTGFYHFbcMaMGUW3CBcuXOjKEaPKgtUOGTIkVr8Eq7hMmj5vGgXL/036yz4NrbELu4MpU6a4dNy4cS7lfEHKxUmvXr3cbXU6Cn5Lq1atioYPH+6207GQEouQlAs6C/a8YsUKF9wZ+P3ZhQ31EZPQyvM7ZdliEoIJFt8J50OWLRYhFzys10MswjAvibbiUXZV7MGueh3uOvBPARYz0Noi52raDjEAgbsxxLu087S1SSvfr18/V552Sz9gAcZ5dIQ7E/wG2U5fa+3cLra5yPZ/o7Qz4hPecccdbvm+++6L1q1b5/pU1hm4kGBVl5oJlkg/EqziMmn6vOUEi4sTu9Xe4HVwLNvFCydcTq50bKThbXewgM6U9bf7y37QaOq2+k2wqN8P+mwBf63uroQOCLjAoHNDqOhQLBQN6xMmTCiU94M9U8620SkSABfBMWkzGFWmk+SCxTqiQYMGFY0gM0pF6gvW4sWL3YWhCRYXP/UgWEnHmzYRtjUr19D8XQDLtBu/fYXlbF+W/UdN/NdiG69jF+kca3ttu2inXPg6XQHH3GSff8yiTVo7QY4IzGxlTbBok9Z2WacM7YA2Sdvz66dt8nmHDh3qZI0yXDzwudm+Z8+eQrBnMMEi5ZlmEyzaJe9VglV9JFg5RoJVXCZNn7ctwbKUzqyhtdMgNfEJxShptIkyjDCbVJEXlvU7NrZNnTq10HmZYPmv47+X8PW6AjoUbo0jMHRWyA+dEJ0W0uR/Hl+wKMeoAOt0VH4HZ+UZ6aKzs3X/Fv3s2bMLyzZq4QsWKSMFJlis/+IXv8i8YDV4x9u+W2sTJj5+O/HbK9g+1l6tHPv5dZPahYNtt3bLcSSlnN9+qdPqC1+nK0CIGHE6fvy4e4+0SQSL9sGx5T1Ze/IFy9ou+9H+xo8f77b5ssSFhN9u/AsHa7sIlgke+ILFCOq9997rBIt1vicJVvWRYOUYCVZxmTR93o4IFimixHKSYJHeddddroxfjwkWZazOpLJ2m9/qprwvWH55ez1Lu5qZM2e61KZyQarsip5RAzqKgQMHuit2EyxuF9IZ0dlRng4QkDKef+T2ILcDKY9gcvsGGaMu9qE+OkXqGjlyZOG9mGB98MEHLoVPPvnEjYDZunVw4efIomDxPdMOTHhYtnbhCxbthnwb+WTZRqVIWacuv13b4ybk0Rb99um/B1K/Pdrrhq/TFXCbkGM4adIkt07qj2DR5ri1zKiTL1jWdimPYNmtRtqbf4uQ29GIFhcHjGDxnXEbO2zv9n5oZ7Rva3t8p/YMICBjEqzqIsHKMRKs4jJp+rzlBKsz+B1fQzfLUB6wzqstwv2yIljVxhciUV3CNleKpOMswaoMCVaOkWAVl0nT562VYIlskFfBEulEglUZVRGssasORBcvXS5wqfnEwMmBTu1ywsESXYs7Dpdbjosdoy8uXoqel2AVkabPK8HKNxIskSYkWJVRFcHSCFY20QhWcZk0fV4JVr6RYIk0IcGqDAlWjpFgFZdJ0+eVYOUbCZZIExKsypBg5RgJVnGZNH1eCVa+kWCJNCHBqoy6ECx++I888kgRYRkRR4JVXCZNn1eClW8kWCJNSLAqIzWClRSM2Eiau8Sft4d5aZhbxtb3798fK59mCG/Tv39/N5Ecn4UwHUyWaBPGffzxx262XkLhsM5cJ4RB8PcjnziNpP5+FtaDeX/C182TYPF5/XUJlkgzEiyRJiRYlVEzwfKlyMJ22My7YLPtmij5M0KTMgmi1eGH4rBy9SRYkBQ2gUkLkSgkyWaHBpuILtzPwnr4+9ls00kCK8EqLpOmzyvByjcSLFFtwvmuSkG7C/eVYFVGzQSrISEcgh/GgGWbrZd1Eyc/lIHth2iFYRhCwSIyOMvMvMyU/7YtKyQJFrP+NjU1xQQLmFHa349ZgRnhYqZffz8/nEeIBKu4TJo+rwQr30iwRLVBnpjJfe/evW7ZZnKnr2BdM7lXn04J1pkLV0sKloVNIKyBH//LD2NgYRBYZpSKcn5IBFtuCMIw2L4WEoCQBMgFPP7441FjY2Ps/aQdEyVGnrhFePr06UJYBSTJbhFy0uW24FtvvVW0n90mJPX3a0uwDjcLFqIswcqeYIXBnislaXQzL9ioL8Fv+W2dO3fOXQRyW53vhbzBgwe7cDejR7cE27WUizlSuw3PhR7r/FZJuWXP7Xzq6NevnytD/hNPPOF+wyz7o9E+9SxY/oV2vUKfZCFuWLe2wZ0W2gGhbYC29cYbbxQuqocPH15U3toNgkNYHD9UDqFwrK3SVxJzk2U7//MYif89I0/EIvz1r3/tli3Y869+9Su3rliE1afTgnXw2JlEwRLpR4JVXCZNn7ecYPlxBsFf9y9m/Nv0XNiQ+sFv7ZY9+9n+dvveRohJ6RC7MkhuV4JgEVSXZx4ZBSeWoT3OQCBmP4izL1h0dnyHdKR2EcOteetYbR+WyUOohgwZ4vK4gLLnJIEg0uH7yopgWRuzi2OWw7YGfJ+0o4bWi+V6FyzguVcLtoxI0xb8WIRJdy2Qesr5wcZpB4iatT+DtotUIfTIGmWIa2gDD9zV8ANEI0/8nkmpywTLRq9++9vfSrCqjAQrx0iwisuk6fOWEyzryGwEy5cqsNFftlmeH2zXylhdVo7URCq8he/fkq8nECXrzBAfMMFau3atG7mysr5g8b0xQgAIFh0To198Z8ia7TNq1KjCsnV84EtV0ihzVgTLb3u23NDanpAvvkfaVB4Fi3bCiBMCjzgREBzBQoQ4tnxf9ryTL1iUI2U/BGv8+PFumy9LtFvanK1PmDChsGztGcEywQMbwSJ9//33o/vvv78gWLxOz549JVhVpkOC9XUzdMDteQZLpB8TLJ7BuvDlV9GX175uPr5fu+MswepeygkWcIucDsyEyb8db7fY7bY6y6Fgsa/dqm9oHQkDq8tGIepdsIDb8sgRHRopz6QgALNmzXIdINJFB+gL1sKFC90yEmaCNGLEiKL0pZdecrf19+3b55b9ESwbvfBHsnyyIljIE+2FtJRg0S55BCRvgsXIJcdw0qRJbp3UH8FCgJ5//nk36uQLlt02pjztxG41Ijn+LULaGaI1aNAgN4LF98otaRN5XsOXJeSJtkgKjNja81iA9EuwqksFgvW164jpkOmYD504J8HKKO4h91NfRGcvXmsVLEawWgSLY96ZE3t3kCfB6iz1LEz1QFYES2QHE6m20H8RVo8KBet6i2BduOo6aAlWNkGwjp6+EJ27dC26eOW6O65fXb8hwUoBEqx8I8ES1YY21R7C/UCCVRkdFKwbrgO+cq35B3f1uuuYT5y9FD34zubYARHph+N28tzl6Pzlr9zx5Li2CNYNCVY3U2vBEulGgiXShASrMtotWCZZSQ+6Hz9zMVqx/Vi0dNuRaMnWw9HSVpZtE2nBjgnHZ1nzceJ4IcdnW5+/4nhyXP0H3DtzYu8OJFiiXpBgiTQhwaqMdgkW+ILFbUIbxfqiuXPmGZ7TX1yJTp7/Mjre3GnDiXOXCzBKIroH/zjYseE4cbwYgUSSi0evsvmAO0iwRL0gwRJpQoJVGR0WLG4ftUjWDfewu5Os5k6a20yIFg++h5xt7shF9xE7Fs3HiePFyBXHr+Xh9pbjmtXbgyDBEvUCHZoES6QB2qEEqzI6JFg3JesbN9rBLSVGPri9dPFKS4eNbDGqVQR5ouspcRw4ThwvjhvHD7kKR686c1LvLiRYol7QCJZIExKsyuiwYPmSZbcLTbQYCaHTFumG48Tx4rhx/FpGrrItVyDBEvWCBEukCQlWZbRbsCAuWS23lYAREDprRkPouEX64Ni00PK8lR07jqMvV505oXcnEiyRNpi89NixY2U5ceJEbD8JlkgTEqzK6JBgQShZJlqMgNiolkg3LcfqpljVg1yBBEukCQQpnMSxFOG+EiyRJiRYldFhwQK/Mw5lS2SH8BiGxzlr5F2w/ODOFrQ5LCM6xowZM1z4EToYguoSwJewJIQ4IY8QJoxAEeqE0CXDhg0rhCoxwWpoaIiWLVvmlinXp0+fQvxCAkrnQbAavLiY/nKt8QNO5xnaMQHHiVlImB1COB08eNDFJNy1a1e0f/9+177JD/cFCVZlVCRYPmEnLbJHeEyzSt4Eq6E1rpuJFfHeTKyIC0dqMQUpa2VsGcJA0SIOMsT3TEfE+ujRLTEJ+e4QLMTKj1U4e/Zsl/qCRafmCxZ59SBYDz74oEtpg3xHFizcUhOchubP6wd8tu0sk9JurS7aqOXZ61CPtVVey/a317LfQPg+JFg3sfiXlgLtl5iFthzuY0iwKqPTgiVEWsiLYDW0dkqkdCZJHY+Jlt/B+XVQzsoSjDd8DXETC+YMBOYdM2aMWzbBovNh5ArBQoqsA/MFi/Shhx5yIwa9e/d264hE1gWrobVdmdjQ5kyk7Duycr5ghWJPe7W6bBvt02SLduwHLw/3DwXLRm8lWDdJEqxNmzYVgpNLsKqPBEvUDXkRLDoYOhrrdOhsWG9o7aBYpmPyBYtly6ccy9ZhSbCS4TsbOHCg61z4rrgtuGbNGtcR+bcIKYt02S1CypAXChZlfcHaunVr5gULoTHp8cWGdkZ+KcEiz297pQTL2vabb75ZaK82Ksuyvbb9JiRYpTGx8m8RTpkyxbU/bnNLsKpP1QTLbjfd4OHp5gMh0gnHpzMn7DSTF8ES2YHOqz2E+2VFsBqCkdFaYqNZ4eiVqD0SrMqoimBxAuDLp0PgpHDx4kWRUjg+HCeOV2dO3GlEgiXqhawIlsgHEqzKqIpgMSpy5cqVaP7aHVGPl2eKlLNxxwF3vDhu4bHMMhIsUS9IsESakGBVRlUE6/r16+6E8A8PjxAZgR8Mxy08lllGgiXqBQmWSBMSrMrotGDx47927Vp09uzZWCcu0su5c+fcyTs8nllGgiXqBQmWSBMSrMqommDxXxthJy7SC0Lc2ZN32pBgiXqBDi1tgsUznOH7FPUP7VCCVRlVE6zTp0/HOnGRXiRYEiyRXjSCJdKEBKsy6lawDp684FL+wm1CgiXBEmlGgiXShASrMmoqWKMXNEbf/O0/on7jljnReWXGmujq9W9cPgJ05uJVt80vw36Ueei1D9322Wt2uxTYh7JsI6UseazzR71Wpy9Y9hqUo+6Ne44V6rU8K8sf+7LPqPmNsc9UL0iwJFgivUiwRJqQYFVGlwgWy5aa4LANyYGkMr5gAfsgPSZFVtYwSUoSLKub17R6TPBCwbL6TOrY7r9OvSDBkmCJ9CLB6jiPPPJIEXx/YRlRGRKsyugWwSLlL9zml4FygkWe/fn1st3qZx/b7tdtebw//o6du1zYhxT54o/XsM9Sb0iwsitYfhBcw2K/GYQWCcsYfqDcvEPYkGeffdYtDx061IUQsWXiDnJeI7TNjh07CjOIW1BnQt2Q+rEKbV9S4rwNGjQo9pqTJk2KhgwZ4pYnT54c2w71Kljl2qWFubG23JAwS3xS2y+1bf369bEyWYbQNn4bHTBgQLRgwYKidvn666+77bTXiRMnuvKLFy+OZsyYEfXv3z+aMGGCK2ttd+3ate4/yvft2xc99dRThbYbIsGqjJoKlkgvEqzsC5Yfi434bH5MOIsD19DaSVlKvi1bvLiw/jxBfLZTp05FBw4cKMRi47/l6KCamprcukkBKdLz4osvunViD7LuCxb7Wj1jx451/119/Pjxotdcvny5EyiW2c5rh+8rK4KFrNOG+BxTp051bcrPo4zFHPTbpcUYZLsth4LFusXQbGhoCRDNMttp79TpSxUC4r+3devWxd5v1vHjBU6fPt2lfrv0AzmPGzfO5VsoJn+bBXh+6aWXnIgiWEeOHIkWLVoUe02QYFWGBCunSLCyL1h0MNb5WJ6lFuSWbZb6QXSt4zIpC18jL1ingyQ9+eST7iqfjsYvY4JFWb5H0sbGRrfPkiVLigTL7wAJ+jx48OCiPH53jB4gI5ZnHaVPVgTLjwtoI6PWrhpa2561U5atXVoZky3yQsGy/U3QWPYvIMACP8POnTuL3lteBMtvlwhTr169XDtDrBjNQp6sHKm1XZY//vhjd9woM3z4cLd/+JogwaoMCVZOkWBlW7DCjog8pMlkic6K1Bct6wCtQ1PQ3JsjWMeOHSsaweL2no08+YJl6ZgxY5wAcbuv1AgWQsKoyvnz54te86OPPnK3b1jmtbMc7NnaGVj7evDBBwt51k59iSK1wM1hXtiubT+r0y4Okm5z+4JlQldvlBIsS/1RKmtXYfu1trtr165CfTaCFb6eIcGqDAlWTpFgZVewRLqhswpvCyInSbcCly1bFsuDrAhWmmC0xgi3ic4hwaoMCVZOkWBJsER6kWCJNCHBqgwJVk6RYMUFK01IsPKNBEukCQlWZVRVsMKDItKLBEuCJdKLBEukCQlWZUiwcooES4Il0osES6QJCVZlSLByigRLgiXSiwRLpAkJVmVIsHKKBEuCJdKLBEukCQlWZdRUsDZu3Bh95zvfKawzLwfT8ftlfvnLX7p04MCBsf1F7ZBgSbBEepFgiTQhwaqMLhMs0h49esQEy+JFcTJhsr+wjrzDbNB8L0x8+MwzzxTyma13z549bjsT79lkh0x8yHw7TBrnT0oXIsGSYIn0IsESaUKCVRldIlg2chWOYFmYA2Y6/t73vhfbX7SIZ79+/ZxAIViPPvqok6e//vWvbuZjAnX6gkXw2mHDhkmwAr788krRugRLpBkJlkgTEqzK6BLBYhspASbDEawf/ehHsf3ETbZs2eJOtsRIC0ewCLlBqA0TLJaJjk7QTwlWMfUkWB2NHdjQGtOtHH7IE9E5CBSddNyS4Dcc5kE9CZaFcQrzS9HgxSC04M5hmXKEM7kPGjQoVkZ0DAlWZdRUsER6kWBlX7AYwbSAuawTd9BisBGrzYLkWkBd1vfu3VsUtxDIt9hw/nIesFiE3Fb3YxEiSU1NTW7dYrmRIj1cwLDOBSPrpWIRjh071n3PYdic5cuXO4Fime1JIXSyIlgm5haombZjgZmtzbGNz8kdC9Yt0HhDa3xMy7Mgztb+wtiZ1p6tnJ9PXfaeRo4cWfQe6+n53qRYhH679GMRjhs3zuVbTEJ/G22XlODOPKZjsQgXLVoUe02QYFWGBCunSLCyLVjWIbFuHY2JF6nfSfnbTawsbWjtmOgErbMzScsD1ukgSU8++aQbKQ6D3vrBcvm+SBsbG90+S5YsKRIsvwPk+cjBgwcX5fG727p1azR16tRCnnWUPlkVLNqVta2w3dkFAeUaglEq1i3PUhMsS5Era5sWxNwkzm+zeRMsv10iTNzdoJ0hVozmIU9WjtTaLssff/yx+34pM3z4cLd/+JogwaoMCVZOkWBlW7BIreOxzsYXLMsD6+isPNvp5Eitg3zwwQcL+eHr1TM2gsU/kvgjWPxTiY08+YJl6ZgxY5wA8U8lpUawEJKDBw+6Z0z91+S24MSJE90yr20jDD5ZEayGVhlCnqxNmVDZyBXtzlJrY3YBQLtLqovU2isjX+wD1pat3Vrd/nvybxEiXsiBvz3LlBIsS/1RKmtXYfu1trtr165CfTaCFb6eIcGqDAlWTpFgZVew2oN1RA3teP5KVBc6q/C2IHKSdCtw2bJlsTzIimD52AhWmN/VILWMHkK4TVSGBKsyJFg5RYJV34Jlt2NsVEtkCwmWSBMSrMqQYOUUCVZ9C5bINlkULFG/SLAqQ4KVUyRYEiyRXiRYIk1IsCpDgpVTJFgSLJFeJFgiTUiwKkOClVPqUbDWrN0YyzMkWCJL0KGlTbDq6b/xRPuhHUqwKiPXgsV8NGFeXqhHwTpw8FAsz5BgiSyhESyRJiRYlVG3guWH/rD5VHyYA4T/slq8eHFsWx6oR8E6eep0LM+QYIksIcESaUKCVRk1FSz+bdfCd/ghESxUQlKIj3BmYP7dnInmmMXXJqCzf0FnmX9Dt+1+CAWrx2YJDt/b7373O5d+97vfjW3LGnyfTBIHfHab+JDUnwTRZ/yEqdHF5hNmZ07eaWLOhwtjeT4SLJElJFgiTUiwKqPmgtXQKjf+bNJhnj8DdShYNgMweexncmZz/Pj7ktoM1uwfzmAN+/fvd6EUEKy+ffu6mZT995xFfMEiOPSKFStcfjnBshGshYuWVf3H0VUgTU1Nn0cfLV4R2xYiwRLdAbNpt4dwPwmWqDZhmysF7S7cV4JVGd0qWOVCfBBCIUmw/LrCfUl9QbP9/PIPP/ywS3/+85/XzQnDFyyW+/Tp4/LLCRZieeXKlWjpslVR04HPoxs3brgfkHH9+vWi9TQStsVySLDicIHxyCOPFLjjjjtiZUTl0FHRYX3wwQeFzuuTTz6JZsyYUVhft25dXQpW0mMZoroMGzYslmds3rzZXUT7ebQzHo0h4DvL9Ivbt293Qc1ZJzg0adI/M0iwKqOmgpVWnnjiiejcuXOx/Dzx7thJzd/B+U6dvLNEPQkWFxOM4C5YsKDodjkpt8vtdjzlrKOzCxu7TU8eZWfOnFmo949//GPstcRN/Jhvfv68efOiWbNmxbaZYPG9//nPf3bLxI/jAuipp55y63PmzMm0YBHnzm9/fhxBLpDt8Y1wvzxBcGVSu9B/7rnnXGptZcKECe7OA9/vypUrC7ED7eJ4xIgRLiVuIIJEu7CA1rt373Yp8Repg232m0fkfdGlnVHm17/+tVu+7777nODffffdbp27OhKs6pJLwRL1+ZB7OepNsBpaR3P98CR265xlX6wsZR8/dA6dnx8YV4JVHusQX3rppahXr16FEYJFixYVbquUEiw6WTrD999/P+rdu3e0YcMGN5KQdcFqSHjcw+460L6sTeYtiHgIx3/Pnj0uGDgjRtxBeOGFF9zvj+DLc+fOLZRFwMhHsNjPRGvo0KHRgAED3PLo0aML5WknlEHewbZxR8NkDWhnHB9Syphg2ejVb3/7WwlWlZFg5RQJVnYFy6BTo+MC69gaEm7J+7fZWbbOjg5wyJAhbvl73/te9LOf/Sz2GuIm5Uaw6CTDbb5gkd5///2FESzW77nnnroRrCShZzRLtwpbGDhwoEtpK6STJk0qtJWxY8e60SkkBgn3R7BoV7QDRq4oQ1m22QgWTJw40aXr1693Ze01GJ1mRMzK2QgWKaJPezTB4r307NlTglVlJFg5RYKVfcHqLHT2NsLAM4/hdtE5TLDWrl3rUti2bVvROs/AZFmwRPfhj06FbNy4MfEZrH379hXa3vLlywvPYwEyJsGqLhKsnCLBkmCJ2mOdV1uE+0mwRLU5dOhQrN0lEe4HEqzKkGDlFAmWBEukFwmWSBMSrMqQYOUUCZYES6QXCZZIExKsypBg5RQJlgRLpBcJlkgTEqzKkGDlFAmWBEukFwmWSBMSrMqQYOUUCZYES6QXCZZIExKsyugywbIQNh3B4g6G+e0lT3OwdPTkJ8GSYIn0IsESaUKCVRk1FywmPESSECwTpoaGhsRAzH55K8tkiLbNytqcPdRD6odo8EMzUJ76bKbresCfwZd5jMLtPsyTwmy+YT5IsCRYIr1UT7AuxvI6igRLSLAqo6aCZYLDso1gIUMmQMw+bWLk72PlQ/myWajJtxmsWfbDMfjLDa0ClhXeeustFyORGXsJkcCkhJxk2WYz+JYSLPYhZYI5yx81alR0/Pjx2OuABEuCJdJLtQRr374DsbyOIsESEqzKqKlgIVAmVoiUyZY/AuXHRrM8UsqGggVW3wMPPFB4DQv94YcEAQvXENaRVpAhpApZMvgMNG4L+NmWYDFiZXGtELZjx44VJM1HgiXBKoWF3fHzGtpxsUI74+Lm+9//fmyb6BjVEqxNjVtieR1FglV/rFmzxrUxP4/+IixnSLAqo6aC1RZJAiW6BglWdgXLRmrtguXll19263axwUWFjRIz8smy3XJnn/D2vN22t2W7ne+/Jnn2GnbREj5XyXbSvn37FuWLlgsfvlNSvn8L4BvGNTROnjoVLVmysrn8sU79Rk+eOhPL6yjlBMvuIFi785dpd+EFtOg4U6ZMcRfK58+fd+3G2hHbJkyY4I4BMk7oGz+OIeVefPFFt24X3e+8844LNG0ztnN+8I/r1KlTY68PEqzK6DbB8k/0ouuRYGVXsPznE/1b4QgP62wHOjfki21Wxn5zbCPPnnkEE65yI1i8hnWa/u/3hz/8YXT77be7oNG6cIrjCxYBd1esWOHySwnW2bPnomPHT0Snz5yNVq1eG23+dJt7nuoLj3AdLl68FO3bfyBqbNzqlq9evRZrWx2lnGBZG0CorO35bTCUcNFxECywZe5c0I7efvttFwzab0PPPfecy0ewCPZMkOgDBw5Es2bNcvLFnQ6Te+DOyP79+wt3OUrFN5RgVUa3CZboXiRY2RWshlbZ4VY7nZndcjfBQoBMkkLB8tcpgwyZTNk+fp7hvwapfyLmVsOcOXOiGTNmRIsXLy7aT7TgCxZpnz59XH4pwbJbhJcuXY5mzprbvH4h1kbaQ60Fy9oD7cqei/XboASr8zDiNH/+fPd8LiNZ8+bNK4xgMQJFkGbayu7du4tGsCjHMhLGCNbFixedYPkjWMOGDXMSZoKFiIWvDxKsypBg5RQJVnYFK6TBez7KRg/CMtXGf03YsGGDuxIOy4nKOHr0aLR9+85O/0ZrLVhJdFUbFJWzadMmJ2x+3siRI2PlDAlWZUiwcooES4JVKXZrMswX1aNaD7lLsEQ1kGBVhgQrp0iw6kewRP2RZcES9YcEqzIkWDlFgiXBEulFgiXShASrMiRYOUWCJcES6UWCJdKEBKsyJFg5RYIlwRLpRYIl0oQEqzIkWDlFgiXBEumFDi1tgsW/+YfvU9Q/tEMJVmVIsHKKBEuCJdKLRrBEmpBgVUbqBavUzLJ5B0Fihl6Wmc+EeU3CMuWQYEmwRHqRYIk0IcGqjJoKlj+TLzP9Wqw0C6XR0Dp/D+vhTNGGzTzt72/7kbJu+4T71jPTpk2Lhg8f7paZQZsZepndl9hTgwcPdvmvv/569OqrryYO7UuwJFgivVRLsE6drm0sQpEPJFiVUVPBQpz8WFUWw8zCKfgxyxo8afLrCAWLZavT4qKF++QBi/Vl6yZYBuvEpIKDBw/G9pdgSbA6S79+/aKmpqZYvug81RKsrdt2xPI6igRLSLAqo6aCBX60dWSIWaCBbRZo1pckSw3EjHLlBIu6qSfct955/vnnnTwxgjV06NAiwWL7oEGDXKyppFmV8yZYV67kV7CmTp0ayzPCwMztDcD+3e9+1wnAD37wg9g2EYcLndGjR7vfJlJKrLgFCxZE/fv3d7HiwvKHDx+pimBt2rQlltdR2itY4UWfqC6c6znP05ZYHzBggGtD9pulfXHXgu07duyIJk6c6MoTH5Q+grY2YcIEV3br1q0uXbt2rXvEZN++fdFTTz3lyoevCxKsyqi5YPmYILUFAoYwIVfhNlEdJFjZFaxQihqCixN/O785GwX2b6WHt+kNO1mTT2dp233xor5HH33UBZp96aWXivYXyfjBnkeMGOEEi/xywZ4J8Lxly2fRuvWNsfbRHuYvWBLLq4RyghUGe+YzhsGew7bGOvjlrK3ZutVl+4gWuDNhy9OnT3cpIkUsUH6jfnsaMmSIC+Rs67aNYM/2e37rrbei8ePHO8GibRI4OnxNkGBVRpcKlkgPEqzsClY4ymQXLr5YWRlfsBq8zsq2h7IW5vsdIOtcJTOysnz58mj+/PlF+4rS+ILFudIC65YSrOPHT0Qff7KuWa42RatWr40mTZ4Zbf50W7SpcWuBbZ/tKlqHLdu2R4cOH3W/7bBNVUo5wfIfAfEFy0azEKywvXIBHZazuxj+RTj7kRe+Zp5JEizaUGNjo0uT2hPP4Vo5Ur5XRrrOnz/v6uP7N8EK9zUkWJUhwcopEqzsChb4t8T9W+d2y91uxbOMLFmAZn8/lsN/DOF2Yni73W7pA/8wwfZXXnkl9p5EafiHFEYLTLTmzp3r8pM6RGAEa/qM2dHKVWu6/TdaTrD8R0BYt2X+aem2224rtE3yWW9obVcmZFaOPLaFgqVbjsWYYCFH3CLk1p+1IVL/FiH/8MRjJGvWrClsJ124cKFL582bV6hPglUbJFg5RYKVbcGqJiZmEG6DcJRL1J5qPeReDcoJVhI2MhXmh7RVLpR/0X1IsCpDgpVTJFgSLJFesixYov6QYFWGBCunSLAkWCK9pEmwbty4IcHKORKsypBg5RQJlgRLpJe0CRbvBcL3KfIBci3B6jgSrJwiwZJgifSSJsGytpgUEULUP7RDzp+Idtg2DAlWMhKsnCLBkmCJ9JI2wbp+/bp7X/z3Gud62qWob5gvi0lIaYcc/3LtUIKVjAQrp0iwJFgivaRJsID3wC0i3g/tkt+TqG84zvTtHPe22qAEK5kuFaxK/t37zTffjOWJFkE6cOCAW+YqY9OmTbEy5ZBgSbBEekmbYBm8F5EvwjaQhAQrmZoKloVKsHUEy9YbGhqKZvhlnTQMj+MHe7byNvFhGAIknDG4npk2bZqbvJBlJpuzYM9MLjd48GCXz6RzzOKb9OyEBEuCJdJLWgVLiCQkWMnUVLAQKl96WG9oFSlLkbByIRGSBMvKIlZMVJcnsTIsxIStm2AZrDOjLxAkNNxfgiXBqgY9evQoTFIKFohWdA4JlsgSEqxkaipYYKEUkAEL8Mm6yZeF9mA7y+EIFuuUKydY9hqV3ILMMoRBQJ4YwSIKui9YbB80aFA0bNiwxNmSJVj5ESzC34R5hv1m7LdF6JKwTCjzPo888kghFAfccccdsTJZZsGCBVH//v2jMWPGuN9a7969XUqAXbYT8obAzYglv0NClDByfPToUZfHiDLfD7LErXx+m6Tr1q1z+/Xq1StavHhx7HUlWCJLSLCSqblgVQKxqcJ4aKK6SLCyK1jhhURDMCrsb/eDPdutdFIrY/uYYPmBnUnZbiFNbJs/Yoxg+fHj6k2wwI8XaM+EEqwZ+Ro1apQTJds+a9YsJ1C2btsIjj1z5kwnWMga8mXbkp4zlWCJLCHBSiaVgiVqjwQru4IV3hL3A+qC3XK30WETLJ5dJI/U6ghHsEyiGDm2siZYNlLsxyx8+OGHC8sbNmyIfvnLX8beb9ZJEqw5c+a44M0rVqwojEStX7/eTchIEF5mvqacSRQjXnzHCBZBdm0Ea8SIEW49fE0JlsgSEqxkJFg5RYKVXcEKR7BMsPzb63TmiBHbGhL+gSQUK0vtH0jYzr7cMqQeq4vUf+2HHnqosIx40a787fVAkmBxa5AUSfJHsHbu3OlSkybbtnbt2mjXrl2F749nJP39QiRYIktIsJKRYOUUCVZ2BUvUPxIskSUkWMlIsHKKBEuCJdKLBEtkCQlWMhKsnCLBkmCJ9CLBEllCgpWMBCunSLAkWCK9SLBElpBgJSPByikSLAmWSC8SLJElJFjJSLByigRLgiXSC9M8SLBEVpBgJSPBagdMEmhhZ4DZmsMyWUOCJcES6UUjWCJLSLCSyaxg+aE7/FmpwzmCbJLFzvDAAw9E+/btK6z/5Cc/iZWpJkxGWCo0icEs0tOnT4/ltxcJlgRLpBcJlsgSEqxkaipYTKrX0Cw9EG7zQ29QzmKglQrjYeXDemwSRH+2aX+71Utdti0ptdcIZ8kGBOvYsWOF9a4QLOKZEVIDERoyZIibJRtYtskcTbCmTJniYp6xjFAywzSfZfz48dFzzz0XXbx4MfYaEiwJlkgvEiyRJSRYyXSJYLGMxPjyY0Jk26wcghVKjolVKFjsY3VaCA8/jAfYCJYfLNrELhQs//X8dQTLPt/o0aOj22+/veg1qo2NYCFQJlHMIG2zSFuepcgVty7Pnz/vRrZYZ3/7fi34s48ES4JVTWhPBDU29u7dGysj2o8ES2QJCVYyXSJYgPiEYTYsNhrLiJXFTmOdZYI+s5wkWAiQCRX1W344guULltVrIUN4fV7DFyyr13+tn/3sZ4WOIxS4WoAQDR061AkUHdfzzz9fGMFimbwZM2a4mGd874TyeOWVV9yDscOGDXNlJFjF5FGwwt9C+Pvz8WMQsh5e5Pjlwjy4++67C2Fi4M9//nOsTBbhgqV///5uNPngwYNR7969XUpsQbYTMoeQN1zg8Jvk+UxGn48ePeryuNjhvIEsEQSa3yKpxSIkhuHixYtjryvBEllCgpVMTQUrCZOi8ETdkHAbMYQOwvYv94ySiZsfe00UI8HKrmD5I68Nzb8bixHo5/vrwAWG/eYs3/a1W+O+YPnlbH9SK09qy+QjWP5zivUiWJAUi3DkyJFOvkaNGlUUU3DWrFlOoGzdtvGPMjNnznSChawhX7bN6vSRYIksIcFKpssFS6QDCVZ9CRbrSBW35mykiu0mTL5g+aNTVlc4gmUSZWV9wfJv7xu+YM2ZM6cQNLoeSBIsRq6amppiwZ7h0qVLTr5Ytm2MNgOCdeLECQV7FnWFBCsZCVZOkWBlV7CAEVpuq5s4ITQmNeGtb8oiBkiR3eL2b8HbaC/bbfTXxMpGjU0sWCbPv70P9913X9FtdG6Rhe85q5hgcfuPW4SkCBZ5Jlh2i5D8QYMGRadOnSpsZ0Tr+PHjLrXbqBIsUU9IsJKRYOUUCVa2BcsnvN0uso8ES2QJCVYyEqycIsGqH8ES9YcES2QJCVYyEqycIsHKhmDZrSaRLyRYIktIsJKRYOUUCVY2BEu/q3zClCuk/EbDtiFE2pBgJSPByikSrPQLFseHyWPDYyfqHwQLwb5+/XqsbQiRNiRYyUiwcooEK92CBV9//bU7VoQ6osPltpGobzjOTPPA7UHk6saNG7F2IUTakGAlUxeCtWnTpuiRRx4pMHDgwFgZUYwEK/2CxbFBsvh9cczodOl8Rf3CMbaRq7z8NkX2kWAlU1PB4t/HLdhyOUqF5ShHgzfzO1Llx0F79NFHY+VFMRKs9AsWmGRxrPidifqG46yRK5E1JFjJ1FSwLBYhosXkg2FsNJsQ0QSLyQ5t8kL2s5A4SfmkVs/vf//7opml+/XrF3svWcKCPYf5IRbsuRIkWNkQLB+OlahvwmMuRBaQYCXTZYJFGm4zibA4aBbig3Xbz2afBtb9OGpWF4LFzMi2Xg+CdeDAAfc98Hm5bfDGG29Ew4cPd9vtOzDBmjdvnvvueCCasosWLXLf2/79+93zOwr2XB+CJYQQaUSClUyXCJat+7cCLdaZn+/HRbMy1OHvZ/X59SJYa9eudcuMiPXp06ewLYsgRMeOHYvGjx9fECzkClgOBWvy5MkunzmTkKr333/ffXcmsBIsCZYQQtQKCVYyNRWsroLXJhYYWJBVUR4JlgRLCCGqgQQrmboQLNFxJFgSLCGEqAYSrGQkWDlFgiXByjPhw+Wi6wmPicguEqxkqiZY7fmvN5Eezp07lyvB+vJLCVbeoa0z5QXTIGjai+7FpqPgeOTlHFTPSLCS6bRggUJ6ZA9mjM5TGA4JVr6hE6e9888gzJjOCK79I4joWvjugePAuUiTqmYfCVYyVREsrkI4cUHYkYv0YccpT5MZSrDyjYUdur3/pOgfHh4hUsKDg2fm7lxUj0iwkqmKYNnVIc+5KG5aeuG4cHw4Tnm7apRg5RvaO7+BsIMX3U/eRtPrEQlWMlURLKCz5irEnnEQ6YTjw3HKk1yBBCu/0NZ5jIHnDsPOXXQ/PF7C8QmPm8gOEqxkqiZYQqQZCVZ+McHiuZ+wcxfdj/3DTXjcRHaQYCUjwRK5QIKVX9oSrKvXv0lcFl2DBCv7SLCSkWCJXCDByi8dFax+45ZF/LF85uJVtzx6QaNL+Qv3F51DgpV9JFjJSLBELpBg5ZeOCtbsNbsLIoVYbdxzLHrotQ8LohXuLzqHBCv7SLCSkWCJXCDByi8dFayPGpsKywjVwZMX3KgWed/87T9i+4vOIcHKPhKsZOpSsDih2n81iq7DvvfweKQBCVZ+aUuwRPciwco+Eqxk6kqwOJEyDQGhGJjrKZxgU9SWq1evuqkg0ihZEqz8IsFKNxKs7CPBSqauBMtmaz5y/FS0dOOuaMmGnaIL2bDjQHTp0iV3skybZEmw8osEK91IsLKPBCuZuhEsTqKMXB04cjL2AxZdx8OvzXGSyy3D8Bh1JxKs/CLBSjcSrOwjwUqmbgSLDp3bgqs+3RP7AYuu4+f9J7lRLEYTw2PUnUiw8osEK91IsLKPBCuZuhIsRk5Wbt4d+wGLrgPBIraYBEukBQlWupFgZR8JVjK5Eyz+3dr+5ToL9Hx1ThHh9rQhwRJpwxes8B8zRPcjwco+EqxkciFYTBRoEwQyiSCEZYAyNs+NLXf3xIK7j5yNNu8/UeC23hNjZdKEBEukDQlWupFgZR8JVjK5FSwmD+Tvkx2HXWoydfHqdTdrMyEyLM9CZ9iMzkiPzeps9dlrsB8TFAL7s87rsswfy2zjj/fAuv2FyxCOWj02fF7s86UJCZZIGxKsdCPByj4SrGRyK1gmQeT5o1bM4kx5X7BsO+VNvkgRpCTBYpvVzR/59ueH4bD6baZoEzn/FuaDQz4o+iwSrMqQYOUXCVa6kWBlHwlWMrkVrMnLPyss+4JlAuTfIkSaTH6SBIvUwmokCRbr9hpWD8u+YJHae7TtwL62zN93/zIm9vnShARLpI32CNbnn3/uCPPby/Hjx6OePXtGe/bsiW0T5ZFgZR8JVjK5EKws4z9/9fNnJ8e2pw0JlkgLX3xxwaXlBOv06dNRjx49Yvlg+SNGNF+kbdxYyP/Od74TK7t48eJo/fr10dKlS2Pb6oXDhw9Hjz32WLRmzZromWeeiR599NFo+vTpLv3LX/4SXb582S0D5fkuJk+e7Jaff/75WH1GKFh23ER2kGAlI8ESVUWCJdLC3n1NLm2PYC1cuNCBPJHHNhMpE6xbb73VjXL9/d//fVEdyBUjWCYL4WvUCwgTn5VlBMvyX3jhhWjJkiXRsWPHoiNHjkSfffaZy+/fv3/Uu3fvQpmwPiMUrL17W46byA4SrGQkWKKqSLBqw+pP1kcLFy2LduzcHW3+dJtoB0uWrXJp4+at0YYNjdGKlR/HOvdQsMhDoBCpULBs3R/BOnPmTLRr165o69at0T333BM9++yzsdeoJ5AhZCkULBMpE6yLFy9Gf/3rX6MnnngiOnXqVFnBWrnqE3d87LgtXba66Dham/9w7kepO6+IFiRYyUiwRFWRYFWfnTv3xPJE21QygoVc2QjVU0895ZZNsGw7I1m2/9GjR6PXXnstevzxx2N11xvLly93t/82bdpUdIsQeVq7dm104MCBwi1CRruQT0Rr0qRJhXwELKy3IyNYi5esjOWJ7keClYwES1QVCVZ1mfXB/Fie6BjlBEt0P6FglWPmrGz8bvOGBCsZCZaoKhKs6rLts52xPNExJFjpRoKVfSRYydSdYOkk2r3wn0QSrOpx6tTpWJ7oGBKsdCPByj4SrGQkWKKqSLCqy5kz52J5omNIsNKNBCv7SLCSkWCJqiLBqi5nzpyN5YmOIcFKNxKs7CPBSkaCJWKcPHmyMLN1W/BfQv6+Eqzqce3atVie6DgSrHQjwco+EqxkciFY/Lu1P69NEv42yrJPWObhhx+OxowZUzSrM5w4cSL6wQ9+EH3ve9+L7ZNF+Dx8B3we0m3btrmUz0jKv2lLsGrPwYOHY3mi40iw0o0EK/tIsJLJpWDZXDc2z43N4Mw2UubFCQXLJspj4rw//OEPRdu+9a1vObHw58dJK/Y5bO6aoUOHuvU333yzUMYEq1evXtGoUaMKgsUkiuPGjYsaGxvLCtZ7k953y+Ex6k6yKFhNTZ/H8kTHkWClGwlW9pFgJZM7wSK1mZr9kSrbZmV9weIEMGHCBLeMUNikgpcuXYp+8pOfuPruvffeaO/evbHXThu+YCFM5QQLmXz//fcLgtWnT5/ovffea1OwmpoORsePn4zmzv0o2rVrb3Tq1JkieK4ozKs1/GD99fenz46VSQO7d+9rFt9N0Wk9e1U1JFi1hfOgnQ/aIimUkAQr+2zfsTuW1xkkWCmjvYJlt/dMshitYt1ikJEyc7MvWLfddpubsfmOO+6I9u/fX8hfvXp1tH379ug3v/lNc8e4O/a6acQXLGKH2XopwSLlc5MiWKQ///nPCyfMJMHiFuHuPfuiVavXxo5Td5HFESxRHbpasPbs2RP9+Mc/djOZh9vqEX7vnAu4+LLzAqGDGO1m9nfWp0yZ4lKe7wz3l2Bln5Wr1sTyOoMEK2WUE6zOMmPGDBcOI8yHOXPmOCEJ87OMCVZ7SBKs9Rsa9QyWSA3VFKx33323aL2hoaFonYu0Rx55xC1bmmVefPFFd/4jJA6/bS7EWCeQs43qm2DxeRkRZ3nVqlXR7373O7c/63/+859LCtaSpSslWBnn9OkzsbzOIMFKGbUUrLyBNIUilQRBXMN99ZC7SBvlBItRpk8//bSQPv3004VtxNM7fPiw46677nJ5Jli2zfKBoM+ICP8Mwwh4PYxgMUpPyucaO3ZsYaSb0SorY4JFrMH58+cXCdbOnTudXJUTLEawDh8+Gi1cuDR27EIkWOnh4sVLToR27d4b29ZZJFgpQ4KVDiRYIm10RLDIe+yxx1xQYgTKyr388ssuRbAoa9savBGsW265xaW333577HWyii9YTU1NhZH8JMFiBIv07rvvdvv17NnTPTrBfx2XE6wdO3ZFBw8eapaytc2siY42d64+PM9py1OnfRDbLrqeL764EPudVRMJVsqQYKUDCVYcOnhROeH32VGoo5RgAc9YMhKFYLFsooRosYxQ+YJFSnnK+iNe9fjsFbf4uBWIYLE+ZMgQlyYJlj2DhYjZM1j84w95duswSbBmz54f7W86GDtuSWgEKx9IsFKGBCsdSLBaOnQ+P506MGGoqAz7Dvk+K5WttgRLdA5+8+HjA6VIOgZ6yF2ESLBShgQrHeRdsGiHdBb86/r58+dd50GbZFRDdBy+O75H2hXfayWSJcFKNxIsESLBShkmWEnzrIiuJc+Cxee+cuVKtH3/4Wjo+6scr0xbKToB3+HOpiPue+V3Hn7nbSHBSjcSLBEiwUoZGsFKB3kfwaKj+OKLL6J/eHiEqDJ8r+3tiH0kWOlGgiVCJFgpQ4KVDtIrWMWhe2ohWHTkPDfEra1QDkTn4Xvl++3obUIJVrqRYIkQCVbKkGBVD555CR9OTYLZ7cN9syJYS5euipXpLHTkV69edfODhXIgOg+TePL9SrDqCwmWCJFgpYysC9aGDRuihx56KPEZMsJMvPHGG7H8WmEzuS9atMilhAciXbx4sUvtX68haSb3LAjW9u27YmU6S3cJ1sGTF2J59YgEqz6RYIkQCVbKSKNg3XrrrS61WIiWT7zDsCy3P/r27Ru98847RfnECty8ebOTnXCfjvLZZ5+52ZaZjZl6ObExzw15YHPdmGAxDxCzU1uw5//5P/+nk6s2gz0fOJhqwdq7tym2vRpUKlijFzQ6wnxRjASrPpFgiRAJVsooJ1gIDgGcEZuFCxe6QM/k27oFd7YyFvSZMmyHHj16FPYlYDQp5diPfPLYB+nw67fXt3zSULAGDBhQWGZyPltGuP7zf/7P0be+9a3ov/yX/xL7XJXgB3sePHiwmwCQ9VLBnu+7776CYPXu3Tu655573MzM5QSLEazVH69rlrPqh1CoFN4b6cZNnzafzK/HtleDtgSLv4de+9Atz16zO+o3bpkbfdq455gTLLaxzjbWv/nbf7iU9TMXr7ryVgd/V69/4/JIrRz7v/vRpy4dNb++pE2ClV6OHz/ugse3BeeHcF8JlgiRYKWMtgQLGUCSWDcRIp+TNvlWxvKSBIt8G5Uy0ULK7HVsnzC1usN8IHYXkkLQ6G9/+9vRjh07Ctuee+45l/7jP/5jIa+z+II1e/ZsN4LFeinBImUWa9I+ffq4FDErJ1gbNjQ2S9mOaNFHy6MlS1Y2f6bdxezcE8+rMTubZY/3F7abatKWYCFCtow8hYIFLFsZpIo/K291IFhs8+u1OiyPZdu3XpBgpRObyb09JM3kLsESIRKslNFRwSJl3UabQsFCnNjG6FIpwSJlPRyZspRt4NfNNl+wpk6d6uJ7zZw5M/a+Cbvxz//8z7H8SglvEZJnaZJgTZs2zaUEtiWdMWOGS+3ZLEgSrDkfLogOfn44doy6E95bmFdt2hIsZIo/xAphQpLIs5EpG40Kl5EnK8NykmCR2p+V9YWuHpBgtcBv7sCBA+6xAhs5Ip/4f7169YrWrFnjpOfVV191QZdHjx7ttjMSTUp59qUsWNB2u1jkeU8uoljmIqt///6F8hYqyL+w9GMR2uMDvO7vf//76I477nDr5WIRSrBEiAQrZZQTLNEx6MhMoMpx6NCh2JB/Vh5yrwVtCVZHQJJsNMuXqTxTK8GyAM4W7Nny/LiDpIzkcrHBcoMX5Lk7QJq48GN50qRJ0ZYtWwqBmUeOHOniB/plSbnAohzbbKZ88tkPMfLrt3UuMCdOnOiCX/M4gT/CbsLmC5aJFIL1u9/9zgV7ZqRcgiU6ggQrZUiw0oEEqzqCJeLUSrBMrEiffroleLMvWA2tMsU2y+tu+I9eRphZZhR60KBBTpSQGITFf5++YFGO8iZYs2bNcttMloDf8MqVKwvr/rIvbtRH6gsWKSNevJff/va30c6dO93ouARLdAQJVsqQYKUDTs7cwpBgxQVBdI6uEKyGZpm65ZZb3K37JMEiZfttt90Wq6cr4TfGrT7+y5d1UhvB4vYd0jNw4EAnYv4twj179rjfKCNZNoJlAjVmzBiXPvPMM9Hbb7/tlhnBeu+991ybRs5sBItRMnsvoWCtW7fOjWAhWJQnj+9MgiXaiwQrZXASJVYZk2SGP2DRdXDyJtCxBCsuCKJz1EqwROdA9sLHB0ohwRLtQYKVMuwkytVU+AMWXQeCVWlQ3lrCewvzqo0Eq7ZIsNILcSLbQ7gfSLBEiAQrhTBqQueOZDH8zQlZdA1834weIljXr1/vcCdYaziRh3nVxhesk2fOiypDO5Ng1R8SLBEiwUohnEgZOaGDJygsJ2PRNfB9c5JEcjvaAXYFnMjDvGrjC1bYiYjOI8GqT2opWBx76xdEOmjP71eClXLshyW6lvA4pAVO5GFeteHzS7BqhwSrPqmVYHHcudimzdizoaL7sCl9uBhv60JcgiVEhuCHHeZVGwlWbZFg1Se1Eizkik599upt0dD3V0WvTFspuhmOw5Y9n7tHecr9I5QES4gMwYk8zKs2aRCsHq3RCkrBv/b37Nkz2rdvX2xb2pFg1Se1ECz7LX6ybX/snyVE98M/PHDMS/2WJVhCZAhO5GFetdi7r8mllQoWMS0hzO8sYaxMYK4kWLZsWax8tWDU4C9/+Us0fPjwaPr06S48E3MrwWOPPRYdPnzYTXZp+ezz+uuvu9RCNyUhwapPaiFYPOtD3bNXbY117qL74Z+iuFVY6rcswRIiQ3CyDfOqxYyZc13almARsxJJYJkwJ8wLRHxKJAgZYhvrbGOdmJWkFguT8lYHKXEuN2/e7LZZHRYX02Jg+oJFYHGbJ44QJuH7qxZ8/ldeecUtI1g2oSUyxTxINnu4H/+yd+/ebj4lCVb+kGDlD84R5X7LEiwhUsasD+ZHK1auiT7d8lmMDRs3x/JCNn+6LZbXHiZNnlnYf/2GxmjZ8lWxTgQsUDggT6FghSNOiJMFFfcDiCMabPPrsu2Ut3r8+iyAN7OV//rXv47mzZsXe3/VBqEKBWvYsGGFh11NsJhVnO+BOH8SrPxRK8GinX2wckusc+8OLK5oexk5v7GIcHvWkWAJkRFOnDhV8odqcCIP86pFe0ewkAgbYUKIkCTybGTKRp7CZSTJyrAcCpaNcLFsQkZKmBMTrKampui1114rhHupJcePH3e3Agm9Et4ipDMlOLF/i/Df//3f3X59+/Yt5LNfWG8tBSsM9lwpFgw6TxBWh9vBBw8edAGhWUfogeNN2/XLhPt3tWAdPHnBBVMP8+Hq9W+i0QsaOyxEPlb/N3/7j9g2H16r1Pu4Z9D0ovX7X54VK5NlJFhCZIS9e/fH8kI4kYd51aYtweoIdEomR75MJcF2yof59UYtBMvEyjABJUUSrVxDazxCf/nll1926YMPPljIt/iFlppwWZxDqzt8H1nnyJEjLrUA0MBo5eDBg2NlQrpTsFhGqPhj3RcstiFJs9fsdusss40y5LFsEnXm4lVXxsqFgsX2dz/61NU5qnVEygSLfahr8vLPCuUlWBIsIVLBpUuXY3khnMjDvGpTTcECRqFsNCvcZtizWmF+PVILweKBeyTLROuuu+5ygYlJkSQTJH9kyka6TLAsRch8waJO6rf1sHw9YfL05JNPRv3793fLixYtKgoKnSbB4o8UySEPAXrotQ+LBItlypDPdpMo8kzS7M/Kkpc0gsW+Q2eudWWpnzwTLGTNBM/4ZcOUonUJVjaRYIlM88UXF2J5SXAiD/OqTbUFSxRTC8EysUKESP1RK8MffbJ10o6OYOVBsPwRLJ7z27Rpk/vnBb9MSHcIViUjWKS23eSJFAFb9dmhdo1g2T6WUtdHjU2F17byNoL17UdHxuSrHpBgCZEBDh0+GstLghN5mFdtJFi1pRaCVQ3qUZi6kq4WrCxQzw+4gwRLiAwgwcoPEqz6RIKVPyRYQmQACVZ+SKtgic4hwcofEqwUwUEQ3U94XNKABCs/SLDqEwlW/pBgpQC+fAJ2MqU+B4MAkaLr4bvnBNhWBPTuQIKVHyRY9YkEK39IsLoZOyleunTJnRg5IITZEF0PHRvBOZGtchHQuwMJVragM6U9tQW/+3BfCVZ9IsHKHxKsboaOnB/I9x8fEzs4onsgjh0nwlI/iu5AgpUtmNOrvYT7SrDqk1oKFnWHrye6HwlWN8OtwQsXLsQ6edF9bN1zsOyPojuQYGULxIkJKMeOHeuWP/nkE5f+4Ac/cOmyZcskWDlDgpU/JFjdDILFiEnYyYvuY8vuA+42ISev8Hh1F1kSLIIbM0u4TWzJMhNSsswEl8wefttttxUmuySlTFhPmli9enVRCu+99140fvz4WD6YYPG5fcF66aWXoj59+kiwcogEK5vw/fLoSFuE+4EEq5uRYKUPBIsfR70KVqkfe3tpS7D8mbyZQdxCsli4Fpv1u6GhobDdhCysKy2YQD3xxBNRr1693DKzd1vHVkqwSG+//fZoxYoVbvnFF1+MlixZEn300UcSrJwhwcom9jttD+G+EqxuJo+C1Vb0dbh49XrR+uenuu42qgSrPB0RrIbW0CuEWUkSLFILt5JmkkawGL0aPnx4LB98wdq1a5cbsWP5hRdecOmPf/zjkifltAtWGM/QjmN7WbVqVdH63LlzY2Xqka4WLOJ3JsX4JI821qON4Optceutt5Zd/9d//deoqakp+tOf/hQ99NBDRdt4Tw888ED0rW99K1Zv2rDfKW2ddOfOnUXrW7ZsKflbbkuwjh8/GcvLIpkUrGPnLrv4TBYbyg/YaXGbiCPlr5u88EfsqN1HzhbqsDwL3mnxqbYdOOXWqcfiVfnLFiyUP/IsiCh12rIfzJM/ew/2ntnmR2u392plrX6LnXXlqxtF38W+Y8nfUS2QYJWnLcESnbvqrZVg2a1Zi0VokkQe2+kwWPZv64IvUWxHlv14hiZcVtb2p6yNUPpBpLld6r+vWbNmxd5rrbF4gSbGxBZEhPmcvvCNGTPGpfad2n58Rvax/Y4dO+bqmj59enTixInmjvN47DW7WrAsiLotmwD5gkXqlyOgOnmktM2nnnqqIGojRoyIFi5c6GDZ6qMelkPBmjBhgkv5friw8Lf99//+35188Uxi+L67Ctomx4z0j3/8ozuWLHMM/XL2O/3rX/8a9e3b130e1hnJHjhwYFnB2r59Z/ThhwtL/pY/274rlpdFMilYSIdFOCe14Jp+5HM/srmVYV/+rIxtN8kxmeHPAn6yjy8+fgomcX599jqW7wugvS/q5jXsta1ekzf+TMysTkCwbvnLO4V1CZYEK0u0d5oGCxDsUwvBstFDlu1WrImQSRFCZM/C2Sikbbcy1GFC5QeMRqDAFzPy7fk6kzhYs2ZN0XtLi2DxnrmVO2PGDNd5MlLBNBoDBgxw/4jk7zdx4kRX3vZ76623XF2UpdNFesLX7GrBQoKQIySJzt/WfcEyKbJ1yvL5hwwZUiiPbJmEmWCxj+0bpvDLX/6ysMxt9SeffNIt83327Nkz+sMf/hD98Ic/dGIavu+uwhcsAnZPnjy5rGAxEsfFwY4dO9w6n4n9N2/eXFKwVq78ONq06dPmMlujyVNmNrepPdG2bTuiHTt3R5+s2dDh33haybRgmXj44mOjQUmCZSNUvmBZlHQbdSKdvPyzRMHiz16f7URQNymy+kj9skRK9wXJ3p99hlCwfBmkPvsM/gjW7f0nFV7jseHzir6bWiLBKo8Eq7bUQrBMili21L9dizyBidHTTz/tUl+irA7K+YLV0Dq6Zfv4gmXbfPwRLBO6riZJsGzdH8FCskjpgP391q5d60Yytm3bVihrI1jhaxndJVj+iJONWPlC5ZdhmXLIgj9CRT7ilSRY1Gf72Wvv378/+vOf/xx7T4zsDRo0KPrZz36WKCRdiS9YpP369WtTsEjvvvvugmCR3nnnnSUFi3PkoUNHonnzF8eOXT2RScHKGiZb/shXpfzL0+Oinq/OcXzv8Xdj22uJBKs87E/UARsREdWF75Xvt6PHqZxgpQlGsIxwWz3T1YLVnfCcXZJwZBGTp/YQ7rtw0dKKLpayhgSrC7DbiDYillUkWOWxjpx2G55QROfhX775fjt6nLIiWHklT4JVT3Tmdn9bD7nXCxIs0W4kWG1DBAJei5MKJ3hRHewkXUmoJglWupFg5Q8JVjcjwUofEqy2oQ7aLicPTvA8vIociMrhe+T7rDTYuAQr3Uiw8ocEq5uRYKUPCVb7oB6+I0AKROew77LS4yPBSjcSrPwhwepmTLAGTV4hUsKupsPuxyHBEllCgpVuailYeh4ynUiwuhkTrPDAiO7D/jsui4J1+bIEK69IsNJNLQVLI1jpRILVzUiw0ocES2QRCVa6kWDlDwlWNyPBSh8SLJFFJFjpRoKVPyRY3YwEK31kVbB4z2FeEvX+Y88rEqx0I8HKJuFkoqU4dOhQbF8JVjeTZcFCRL797W87wm1MvEZATws1kSWyKlgHPz8cy0ui3n/seSVrgvXzn/88euSRRwr827/9W6xMPdFdgtWjR49YXkf4p3/6J3cuP3nyZGzbT3/602jatGmx/HrCBGro0KEu3bt3r0tfe+01l+7evbtQJtxXgtXNpFGwLKaUBQm1fIJ+JpXjB9i/f/+ibXfddZdLLUp7d/Loo4+6SOjEmyKG2Jtvvumiu5P/zDPPxMqvWvVJ8+c+nDnB+nTLZ7G8JOr9x55XOitYxBcMwx9NnTo1Vs6HWIYWd9BiFPrbyQv3MQiKTMw6W9+0aVOsTC14++23o+HDh0cHDx6MXnzxRRdjj1iEiApxCAk+TZkFCxa4wL6vv/56dPTo0aL9TGpsP+r9+OOP3Xmmd+/esdeEjgjWR4uXx/KS4By1b19Tc6e/L/Z6iBUXumE+ecQdZLnUOd147rnnXMp5/Mc//nHRtv/6X/+rS3/0ox/FXiMLcKzoA2jzL730kjuWS5YscXlg5UyeiK1IeCdiULJO/7hhw4Zoy5YtEqwwIy2UEywLomlRzE1W+FFYcE4OMil5/HDsB2MBPW1f8inLMqmV9YN7+vWTmmCRT+r/GDlZEH3c1sePH+9SGivBPImYTgPuzmjphh/Qk5MfgkX+s88+GysL1sl8/Mn6aNfuvbFj1h2UEizmTzp+/GS0qXFrbFsp6v3HnlfKCRZt2gSKtMEL0Gz5iJIvWOS//PLLRftbWcQKefIFy+qzZfY14bKg0va6gGDt2bOnsN5VggVJwZ4nTZoUjRo1qijYM7Lljw7ZfsuXL49mzpxZ2A8Zs2DPfD9J572OCNbevU1tPk+5bduOaMPGT0uOYJlgWT9CP0GMQFumjPUblLW+xq/j3nvvLSz/6le/Kiz/t//239y+nONnz54de+0sYH0CKRfcjY2NbrlUsGcEq0+fPu6uDOsEewYJVkYFy6KfIzqs06DNnO1HYRLkSxNl/YjpbOcHZZHQ/auU8Mfmp1Z3mA80NNLHHnvMXeFZ/m9+8xuX3n///bGr4e7CF6ympqZClPdSgnWoueM4cuRo85XKnmjuvI+aj88XzZ3WuSI4ZmFeLdm+Y3csD8L21B6q8WOnDlFbwu+8LdinvYJl4oQcmfz4omXrVg6Zst8zqY1MhYLV0CxQnBNY9gXLL2MgWFbP6NGjo1tuuSVWplYkCRbnOtZ9wQKiFCBQ/n4DBgxw2H6cV0ywwtcy/v/2zvU5imLv4/5Bvnle+MaijhYlWilL0aLykjrywsOjJSDXYImuggKCIgiFGKFQMEHFG1eJJIAkEq4JtxA0xEsI8BAleCSgcOrUPHxbvmtvz2Y3G2dnena/W/Wpnunp6ZmdW3+2Z3Z+pQgWwTme7/pz6dLl4NPPtgfffXfu9jb8Kbh48VJoef+0BAvj/JHuXvOx/mwT7LaBPVOQLF7vAW4JDg4OBhs3bjSi6S43LdiChRTtQiHBmjp1qklnzJiRbXORzpw5U4LlZvhCqYKFFCcOTxpXsHDiYBrnRVlXsHjSsQfLFSzMC+y6Mc0WLMyPW4PuOoPJkyfnvcgnhX2LECcQLxbDCdaJE6eCfV+3pe4W4UgZzcmOebA9cLyikbh+/booM9jO2N7Y7iPZZ4UEC9TU1Jhb9xQnCA3FB8MQI5wfKMNyECgMQ4SQUoIwjPooWMjnYwEcR08x6uM8SDEP12fcuHEmD4wdOza0vuWEooRbhO+//74RJYzjGmHfIoRsoUceDSXngyj19/ebFI8csM5yCFYxcGx8tXuv+UHoLs8WLPZOIQ/T7DsbGHengwceeCDUo0VwDT158mQoP03Ytwjt3kd3H1KeUAbp8ePHTdraikdJvg86OzslWG6GLxQSLJEM/KUuwfoL3Iq8du2a+eWKhgKNOLaTKA/YvtjO2N7Y7tj+7j5xKSZYNuyZEvFRLsEa7hahiAbKUzHy3RaWYCWMBMs/0MAhlWD9VR4Xif2d34XiNoryc/h0r+nRKrbfShEsET8SrOpDgpUwEiz/kGDlwov4k298Fmr8RfmZunKr2f7FjkcJlt9IsKoPCVbCSLD8Q4KVC25PXb16VYKVEBAsPGhd7DahBMtvJFjVhwQrYSRY/iHBykWClSwQLGx/CVa6kWBVHxKshJFg+YcEK5dCgjX0+62AH3eaiAYJVmUgwao+JFgJI8HyDwlWLsUEi8P/enNLcKj7vMnrvThopAvjmCYJGz0SrMpAglV9SLASRoLlHz4K1k99/aG80VLqyV5MsPiBYF2+OmTyIVb43PrPf4N565vNMFJ3flEcCVZlIMGqPiRYCSPB8g8fBauUUDjFKPVkLyZYHLYFC2KFcaT1O46YPPVgjQ4JVmUgwao+JFgJk7RgucE97be1gwMHDpi33d53332hefEmW7zpt729PTQtzfgoWF+3HgjljZZST/ZCgiXKTxSChWOaIXFKwX0haSaTMW94zxfE+YknnjBvQCcLFiwIlalm4hYs7CM3/BBDHrn7tRRwHGVuHwf22/tHyhdffJFzjMydOzdUppKQYCVMIcGC/DCmIMLVYJgBnhnqgKFxEOqAsaYY3oDhcFgX+Oed0Dmog4GeMT1fOBzw5JNPmhRhNN58881sPk5oRJbHMEJeuOvuE3a8KURNLxbs+dixztvb5qg3ghX1RbnUk12ClSxRCNafx/WxnHA3ZNOmTSYvc7vRxHnixixkOBuURRk20gyJw3pwbvHHCXj22WdD6+ArDJWDRh/bA8Nr1qwx1zgIDKTCDqHC8mDz5s3ZcGMIdo1twFA8NnELFsMfUbQYoJuChRT5DJfEPJTjMcA6MJ0hlChYXA7jWaKse4zxuGJZhCWywwvt2rUrtN7lwo4xyRiUiIG5bds2s7947GLfYpsy9A1iLnIa9jWm4VjANn/hhRey7QnqcZcpwUqY4QSLEsRxihSDc3IahYoChTxIFMpTuuyYU5yXEoZ5UDZfQGfM39vba4YvXrxoYi5hGCdIQ0NDMGXKFBPw1F1337AFC4FKKYrDCVZ//wUTUPV019mguWV/8Nu1a8G1a0M5/PZb7nj0XAt6enqDA+1Hbl+Ufw8dN3+HUk92CVayRC1YtgQBNrBoJPMJll0uYwmW2yMGwUKMPo6nTbBwHUQPCxtMpGiAMYzUFqxZs2aZxhXDiFnIBhspevZ9ECzu18wdwUFqCxbzUQ4gj/sYw5QmgHnsAN+cl/XiWKFM2QG+OT/XBYL1ySefZOdNWrDQlnF/1dXVBcuXLzf5EO1vv/3WDNuChX391VdfmbpefvllM23JkiXBsmXL8vbqSrASZjjBYpBOCBFEB+KDPAoWJArlmI8D1xYyzINx9li5gZpZFoLFni+3HC4ofX19RkqOHj2azb///vtNes8994TW20dswUKKW57IH06weDIdPtIRdHScDO2ztFPqyS7BSpYoBctOidsQ8xYgUuZRuDDORprTiC1YaFT37NkTWgdfYY/URx99VFIPFuLPQW5QpqurKxs02CfBQq8a0swwgoVh7FsAqaRY8zhgfRRwW7DYK8ZeLuRT0FneXqcNGzYYKcEwgmizLYmDfILFniu7B4vHMEWbgsV9/cEHH2TrwjSWy4cEK2GGE6zRwF4p9zafC+QKUubmu0ycODGYN29eKB/wl10l0tZ2IOg++503twijptSTXYKVLFEJ1nCwIf674Ff8U089ZcAPPHd6tRO3YPkI1pPHyIwZM0LTKw0JVsJEKVjoreJzWu40Armye7pEGP6SkWD9iQQrWdIiWKIwEqzqQ4KVMFEKlogGCVYuFCzEw3O3lSg/2O7lFCwRDxKs6kOClTASLP+AYOEh80o9KUr9XhKsZClVsNTY+gmu8+UQLNbtLk8kDx7FkWAlCATrypUroR0jkgM9ABKsv5BgJctIBQugAVdj6ye4zuN67+6zvwMFS22In+DH+vXr10u+5qYNbwULF0108bo7RiQHegAq+aQo9XtJsJKlFMHivnLrEMmD/TiSfVgKOJdxrRocHAwtTyQPxBc/ekq95qYNbwXLPkGwM9C4i2TAL39eqKK+EPpEqSd7FIJV7I8VbW1tweTJk9VQ5KEUwUKPBm5JoDyOZ/cYF/GD6zqOa1zny/FcJ3rF8CNd+9wf2JbgTshIztu0461gAZx0sFxcGN2Lq4gPnAy4COKEKFVC0kSx7+bexohCsGz4ElyO40KEC9K0adOyL/pLK3g/Dt4JhIdb8b41gBcWIiQI36o9ffr07LvYUO7cuXPmVsLevXtD9YFSBAvweoLj2a1LxA/2A/ZHOeQK4HzGOYtrl/a5H1RLW0K8FiyAnQBwEorkqIaTodB3PH2626QnT57O5hUSLL5zje9Ws8MzAUYX4AttUQ7DtmDhrdgcXrlyZWgZaWL+/PnZEBt8ASFeYgjBQjSETz/91MgUX3SIlxauWLEiJ8+lVMECup74A/eFu4+iRvvbL+LY577gvWAJ8XdBWJ+WPfuDrjPfBidPnSmJU3fSL79sztbX0XnK5HUePxUcPHQk77M97ktt7diWdqxLhmRCnt2DhSgBjO31yCOPBN3d3aFlpI3Tp08bWXIFCyKF72rLFHqzpk6dGrlgCSFEXEiwREXT19cfyhuOYr+sWva0Bqe7/uzJAoV6sNwA4xQqCBTyGEKD+chbunRpVrDeffddExsyX6DUNAKJQoxO/BPVvUWIZzPQY8VbhLg9CKk6cuSICbPC8m6dEiwhhM9IsETF0tS0J5RXiGKC5VJIsET5kWAJIXxGgiUqlrNne0J5hZBgpQsJlhDCZyRYomLBcz1uXiEkWOlCgiWE8BkJlqhY0Ai7eYWQYKULCZYQwmckWKJiQSPs5hVCgpUuJFhCCJ+RYImKBY2wm1cICVa6kGAJIXxGgiUqFjTCbl4hJFjpQoIlhPAZCZaoWNAIu3mFkGClCwmWEMJnJFiiYkEj7OYVQoKVDAihMxLc+SRYQgif8VqwGEMKF1AE7URgUJFOsP+wH+OMRYVG2M0rRKnrJcGKBshTW1tbVqQ+++yzYN++fdlxBIqWYAkh0oa3goXGDhdORN/GRfSXX34xITVEOsH+w34cGhqKrUFEI+zmFaIaBAvhZ5Ayvl9zc7NJFy9eHNTV1ZkwNQjPs2zZMvMesfr6ejOdaWdnp0lnzpwZPP/889m8vr4+U/7VV181goQ4g6gPcoRlYRixCAcHB01gZ3udIE+IuThhwgQznMlkgoaGhqC2ttaML1q0SIIlhEgd3goWejogV+t3Hg7+539Xiwqh5Ui3kSzsX3efRw0aYTevEFEK1qRJk0x67NgxE7AYw0h//PHH7DTGI0SZzG2psPPKCSRr/fr1ZrixsdGkGzduNClkqL29PVvWFizI17p167Llzp8/b74Ty9jznDhxwkgavu/mzZtNnEXIFaa78RUpWL29vUFLS4vZFohN2NPTE+zfv99ImwRLCJE2vBUsNl5uAy3Szb1T603DGEejiEbYzStElIKVuSNMEAxIyO7du7OCxWmUFUxjXhysWbMm6O7uNrz99ttGqCBY7Fli7xawBQvru3z5ctMbiTKchvpYHiIEEeP4hg0bssOsd/v27TnrQ8FCip40bAv0YGH8pZdeMnkSLCFE2vBWsPDMzpUrV0INtEg3ECz0ZMTRKKIRdvMKUU7BqqmpMb1TwwkWyowZMya2Hiyka9euzabswdq7d2+wa9euYOHChea72YK1c+dOM4weKMgSpAfrjRS3CAcGBkxPFcrie+LWHlI8X4X6sN8BlmGvD+Y/fvy4ScE333xjbjty/ODBgxIsIUTq8Fqw8EvZbaBFuoFgQZyxf919HjVohN28QkQpWGLkUKSK4c4nwRJC+IwEq8wc6j4f1O84EsrPx7/e3BJcvjoUfN52xuBOrwQkWCIqJFhCCJ+RYJXA0O+3QnnFyCdYECnku2WJBCsa0Ai7eYWQYKULCZYQwmdSKVj4QFrwgYjgg/xb//mvGYe89F4cNCnyIDRIOS/GOS/yURbDSFkW9UOo5q1vzqkfKXqZOM71wLwNLSdyeqGQhzpQxp4X4xQs1G+vl92DxXmQ726DtCLBElEhwRJC+EwqBQvSAumAwGAcIgJRoSBBUjBs57mChTKYDtGh0Ng9VLYEcV43dcvZdbPnimm+ebB8fpd8gsU6K6k3S4IlokKCJYTwmYoRLKSQE3ww7AoWhAYfzptPsCg67JlyBQvz2r1a7J1iOU5nDxc+x89dMmXY08Z1xoe9bazLFSwsFx/1YI0ONMJuXiFGK1jAbfxF+cGLTSVYQghfSaVgifRSiYKlHqxkUA+WEMJnJFgiViRYIiokWEIIn5FgiViRYImokGAJIXxGgiViRYIlokKCJYTwGQmWiBUJVpg5c+aE8kYDQu64eT6D4M4I07NgwYJgx44dJrQOYiPivG9qagoOHDhgyrzxxhsm351fgiWE8BnvBevrzh5RUXxXFYJFaWK8wYwVzJlBn1mmtrY2OHbsmMlHeQ5jmi1NKIcU0+06mbIsUtaNaVgW5rHr9YmtW7ea1A4yjXiFDD594sSJ0DxAgiWE8BnvBcu9qIp0g7/WV4NgUawIpYiBne2gz5Aht/cJZRD42a6H5e26hktZFikDTjO1l+MD+QQLPVjvvfeeGZZgCSHSiARLxEq1CBYkZ8yYMQaMU4pqamqMOLFXCdPZ28TyzKdcYThzW5SAXRfGOY11YxqWjfoxjcNpECz3FiHEanBwUIIlhEglEiwRK9UiWHHg9npVGxIsIYTPpFKwZs+eHcpz+fDDD4PDhw+H8kWySLBEVEiwhBA+k0rBcrn33ntzxh977DGTrly5Mti/f3+ovBgZbW1t2dtZ06dPD55++mnznAzSWbNmmTKrVq0y47iNg8auo6PD5L/11luh+oAES0SFBEsI4TOpFKyHHnoo2Llzp+nJ+v7770OCBRng8PLly0Pzi5GxYsWK4MyZM2a4rq4umw+pamxsDAYGBsz4woULTYpbVhxGGbc+IMESUSHBEkL4TGoFa/Xq1cGhQ4fMuC1YEyZMMOm8efOCf/zjH6F5RWlAYD/++OOQYL344ovZcUoVykybNi1bxq0LSLBEVEiwhBA+k1rBQnr33XcbubIFa+nSpaEeLTE68C823CLs6+vLuUUIefr888+DS5cuZW8R4tYgROzcuXNmGHnA/deaBEtEhQRLCOEzqRQskV4kWCIqJFhCCJ+RYIlYkWCJqJBgCSF8RoIlYkWCJVzwL1U861eIH374ITSfBEsI4TMSLBErEizh4srUcLjzSbCEED4jwRKxIsH6C8YlxHDGCgbtlnHz0kBvb2/w3HPPmfSVV14xefgTBELh4B1pyGdZyBOmzZ071wxjWzQ0NJgU44sXL5ZgCSFShwRLxEq1CBbjCzKeYMYSKMYFxD807fLIswM2c5zzojxiDTIWoe/wVR14nxpeRAuJwvhPP/2UU46C1d7eHpw9e9Z8XwgW/rHa09NjYhRKsIQQaUOCJWKlWgSLgZvdYM+QJOQNJ1iQLwoY8iFYnIfBnN1l+QoFC2l9fX1RwUK6ZMmSIHNHsDAOOZNgCSHSiARLxEq1CNakSZNyxilGECYMs3fKvkVIwWI5DNs9WHY9acAWLEoUxgsJVlNTk/m+FKzt27dLsIQQqUSCJWLFZ8EqlUKCJUYO5GkkuPNJsIQQPiPBErHiq2CdP38hlFcMCVY0XLhw4fb2P1+Q/v7+0HwSLCGEz0iwSiDjPKjs3q45fvx48MwzzygGYgF8FaxvvjkcyiuGBCtZJFhCCJ9JpWDhmQ489Ju5LTxI+c8rDNfW1uaUgQShHPKYuvMjD3VgGOJkT7fr5TgeNsYzNq5gjR8/3szPWInVAp+twYPa+P54xoYPa7tlIVhfbNkZ9PT0hvZ51GB5bl4+/v3v34IbN0oXPglWsmC7AwmWEMJHUilYfACY/7RCw07JQh547bXXzDjSjCNY9vyQJAzzH18oY8+L6RzHNPufXhQs3OKYPXt28PDDD5serOHWu1KhYOFv9a2trUUF69Dho8GJk6eDr3bvC3Y1tQRdZ87mcPZsTyhvNGAZbh451nEi+PLL5tvrsDd07I2Umzdvmu8jwUoGbHuk2A/uvhFCiKSpGMGiKFF6bEniu4j4t/h8gmX/68sVrIwlaFwG50V+R0dH0NjYaARrYGAgtL6Vji1YGC4mWLhFePDg0aCj82Rov0cJlufmRQn+dXj9+nUJVkIMDg6a7V/qvz+FECIOUilYPoIHcd08EQaCdepUl3fPYI0W3J5CI4/vhQYf8ijKC7Yztje2u3qvhBC+IsESseLrQ+5/B/SgQLQAvpcoL9zW6rkSQviMBEvESiUKlhBCCOEiwRKxIsESQghRDUiwRKxIsIQQQlQDEiwRKxIsIYQQ1YAES8SKBEsIIUQ1IMESsSLBEkIIUQ1IsESsxClYN27cCOUJIYQQcSDBErESl2Bd+r/LoTwhhBAiLipWsBgWB2TuhLqxGTduXNDS0hK88847oWmifMQlWLua9oTyhBBCiKhz8g4AAAVFSURBVLhIpWBBnhCYGcOIB4hxpMirqakx+YgjiHiByLNlC2zbti1YtmxZ0N3dHdTX14fqF6XBWISICYn4g8ViER5oPxy0tR0M7fOo+PHHvlCeEEIIESepEyw02pAmAKliwGUAuaJ4QbAyVpBmlhk/frxp5F9//fWgq6srVL8oHTvYc2tra1HB2r6jKWhu2Rfs/LI5aGj8JNi7ry2H9vYjobxi7N9/IPjk021Ba1t76FgSQggh4iZ1ggXWrVuXHaZgobcKcJotWHYP1qOPPho0NjYGU6ZMCdUrRoctWBguJli4Rbh1667g4sVLof0uhBBCVAKpFCyRXiBYly8PlP0ZLCGEECJJJFgiVuJ6yF0IIYRIEgmWiBUJlhBCiGpAgiViRYIlhBCiGpBgiViRYAkhhKgGJFgiViRYQgghqgEJlogVCZYQQohqQIIlYkWCJYQQohqQYIlYkWAJIYSoBiRYIlYkWEIIIaoBCVYZQIgYO0biSEB5hPpx88Hu3bvzhp1JIxIsIYQQ1UAqBQuxBRnUGWKCcaTIQ8Bn5K9atcqMb9myJVsWooJhiAzK19bWZstnrMDQnIZ6880P2dm0aZMZRhnEP2S9qG/SpElZYWJQaruMXQ/XE/nuONaB87vfm+W43nHCOINg48aN2fz6+vpgw4YNOWXceSVYQpTO448/Htx1110iIrA93W0sRNSkTrDQaEMsKB52TxHkhgKCYM9I2ftDyUEehQzDTDOOYGEY5e35uVyUYV1MKVQUC0oayiNlXfY89npyXo6764hp7OHC/CzHNE5swVq8eHFQV1cXDAwMBIODg0Fra2tOGXdeCZYQpeHKgYgOd1sLESWpEyxgCwolBPIBOC2fYM2ZMyc7zRUsls8UECz0TLnrwNQuxx4ySBLL2+vL9bCXS8HiMrgerJPLYB2+CJbdg7V69eqgoaEhp4w7rwRLiJHz4IMPhqRARAe2r7vNhYiKVApWJZOEMMWJBEuIkeMKgYged5sLERUSLM+QYAkhiCsDInrcbS5EVEiwRKxIsIQYOa4MiOhxt7kQUSHBErECwcLD8H/88UdonwshcnFlgEycONGA4ebmZpN2dXUNW6ZQOdDf3x/KKwbry0ehafmYP39+MHbs2Oz4zz//HCozWlDv2rVrQ/nE3eZCRIW3goUG+OrVq6EGWqQbCNavv/4qwRJiBLgyQPIJFlKICj+LFi0y4oQPJGO4cijDckgxHR9KCcpCypCPPHywbNZ38+ZNk4dl4IPz3BYs5mEY9eCD1C6PZUCq8EE5rAeW0dvbm83jskuVN9SD+t184m5zIaLCW8HCSXvt2jXTILuNtEgvkKuhoSGzf919LoTIxZUBWxryCRZ7oigoLAM5yVeOZTjOMnaPj927xA/OZZbFMD4UMdaDeSBI9nI4jn9CYxzXAXcZGHbXn4Jn976hHOXO/ri9cahDPVgiCbwVrFu3bpnbhJAs3FLC7UL8whHpBPsPPZLYn+i9wv5197kQIhdXBmxpyCdYdu9OIcFye4FcwbKn2/KDc5n5KIP6MZ1QoNx6sHxbuCBYrAd5wwkWxcgWpHy3OIvhfl8bd5sLERXeChZAI4xfKBAtcOPGDZFSuA+xPyVXQowMVwaKQYEp1GNjlwOjEZY4sAWxnLjbXIio8FqwhBDJAREWyeLKQDHsZ5zcafnK4eNO8wUJlkg7EiwhRA52A48eR4JbuyJeXBkQ0eMe/0JEhQRLCJHFFis28rpFnxzjxo0LCYGIDoXKEeVEgiWEMLhyZaQK76O78mtw4dLPIiFcKRDR4Z4DQkTJ/wNJIa8abIFH7QAAAABJRU5ErkJggg==>