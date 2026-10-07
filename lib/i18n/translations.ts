export type Locale = 'en' | 'es' | 'fr' | 'pt' | 'ar';

export interface FaqItemTranslation {
  q: string;
  a: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

export interface Translations {
  nav: {
    videoDownloader: string;
    audioConverter: string;
    blogReader: string;
    howItWorks: string;
    faq: string;
    quickPaste: string;
  };
  hero: {
    tagline: string;
    defaultHeadline: string;
    defaultSubheadline: string;
    inputPlaceholder: string;
    paste: string;
    pasted: string;
    download: string;
    fetching: string;
    testPresetsLabel: string;
    testPresetsHint: string;
  };
  card: {
    watchPreview: string;
    closePreview: string;
    playingPreview: string;
    readerMode: string;
    originalLink: string;
    tabVideo: string;
    tabAudio: string;
    tabBlog: string;
    selectQuality: string;
    highSpeedMirror: string;
    quality: string;
    resolution: string;
    format: string;
    fileSize: string;
    audioTrack: string;
    action: string;
    downloadBtn: string;
    downloadingBtn: string;
    completedBtn: string;
    audioPlayerTitle: string;
    included: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    videoTitle: string;
    videoDesc: string;
    audioTitle: string;
    audioDesc: string;
    blogTitle: string;
    blogDesc: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItemTranslation[];
  };
  footer: {
    description: string;
    mediaToolsTitle: string;
    supportedFormatsTitle: string;
    complianceTitle: string;
    terms: string;
    privacy: string;
    dmca: string;
    admin: string;
    disclaimer: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  en: {
    nav: {
      videoDownloader: 'Video Downloader',
      audioConverter: 'Audio MP3',
      blogReader: 'Blog Reader',
      howItWorks: 'How It Works',
      faq: 'FAQ & Guides',
      quickPaste: 'Quick Paste',
    },
    hero: {
      tagline: 'SaveYahoo Engine v2.4 · 100% Free · No Software Needed',
      defaultHeadline: 'Yahoo Media & Blog Downloader',
      defaultSubheadline: 'Paste any Yahoo Video, News clip, Sports highlight, or Lifestyle blog URL to extract 1080p MP4, studio-grade MP3 audio, or clean reader text in seconds.',
      inputPlaceholder: 'Paste Yahoo URL here (e.g. news.yahoo.com/..., finance.yahoo.com/...)',
      paste: 'Paste',
      pasted: 'Pasted',
      download: 'Download',
      fetching: 'Fetching...',
      testPresetsLabel: 'Or test with live Yahoo sample items:',
      testPresetsHint: 'Click any preset to preview',
    },
    card: {
      watchPreview: 'Watch Video Preview',
      closePreview: 'Close Preview',
      playingPreview: 'Preview Mode · Yahoo Source Stream',
      readerMode: 'Instant Reader Mode',
      originalLink: 'Original Yahoo Link',
      tabVideo: 'Yahoo Video (MP4)',
      tabAudio: 'Yahoo Audio (MP3 / M4A)',
      tabBlog: 'Yahoo Blog & Article Reader',
      selectQuality: 'Select Video Quality for Download',
      highSpeedMirror: 'High-Speed Mirror Available',
      quality: 'QUALITY',
      resolution: 'RESOLUTION',
      format: 'FORMAT',
      fileSize: 'FILE SIZE',
      audioTrack: 'AUDIO TRACK',
      action: 'ACTION',
      downloadBtn: 'Download',
      downloadingBtn: 'Downloading...',
      completedBtn: 'Completed',
      audioPlayerTitle: 'Listen to Audio Track Preview',
      included: 'Included',
    },
    features: {
      badge: 'High-Fidelity Archival',
      title: 'Engineered for Clean, High-Speed Archival',
      subtitle: 'SaveYahoo extracts the authentic source stream directly from Yahoo servers without compression loss or intrusive watermarks.',
      videoTitle: 'Full HD 1080p & 60fps Video Streams',
      videoDesc: 'Preserve original bitrates and high dynamic range. We extract pristine MP4 containers directly from Yahoo servers without transcoding loss.',
      audioTitle: '320kbps Studio MP3 Audio',
      audioDesc: 'Extract high-fidelity audio tracks from press briefings, podcast broadcasts, and interviews with embedded ID3 metadata.',
      blogTitle: 'Yahoo Blog Reader Mode',
      blogDesc: 'Yahoo blogs contain rich recipes, fashion columns, and tech articles. SaveYahoo strips out intrusive ads and tracking scripts into clean Markdown or PDF.',
    },
    howItWorks: {
      title: 'How to Download Yahoo Media in 4 Simple Steps',
      subtitle: 'Save videos, audio tracks, and blog posts effortlessly with zero software installations.',
      steps: [
        {
          step: '01',
          title: 'Copy the Yahoo Link',
          desc: 'Find the video, audio segment, or article on news.yahoo.com, finance.yahoo.com, sports.yahoo.com, or yahoo.com/lifestyle and copy its browser URL.',
        },
        {
          step: '02',
          title: 'Paste into SaveYahoo',
          desc: 'Paste the copied URL into the search box above. Our intelligent parser instantly resolves the official Yahoo CDN media stream.',
        },
        {
          step: '03',
          title: 'Watch or Sample the Preview',
          desc: 'Click the video player to watch the stream inline to verify content and sync before committing to a download.',
        },
        {
          step: '04',
          title: 'Select Quality & Save',
          desc: 'Pick your preferred format (1080p MP4, 320k MP3 audio, or Markdown article) and click Download for instant offline saving.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions regarding formats, video preview playback, audio extraction, and compliance.',
      items: [
        {
          q: 'Is SaveYahoo completely free to use?',
          a: 'Yes, SaveYahoo is 100% free with no monthly subscription fees, credit card requirements, or software installations. All video, audio, and blog extraction tools run directly in your web browser.',
        },
        {
          q: 'What video resolutions and formats are available?',
          a: 'Whenever provided by Yahoo source servers, SaveYahoo offers Full HD 1080p, 720p HD, 480p standard, and 360p mobile resolutions in standard MP4 containers compatible with every smartphone, tablet, and PC.',
        },
        {
          q: 'Can I watch the video preview before downloading?',
          a: 'Absolutely! Click the "Watch Video Preview" button on the thumbnail to launch the interactive HTML5 media player directly in your browser. You can scrub through the timeline, adjust volume, and verify the video stream before downloading.',
        },
        {
          q: 'Can I extract and download MP3 audio from Yahoo video interviews?',
          a: 'Yes! SaveYahoo extracts high-bitrate MP3 audio (up to 320kbps studio profile) with clean frequency normalization. It is ideal for listening to Yahoo Finance earnings calls, market recaps, or press conferences on the go.',
        },
        {
          q: 'How does the Yahoo Blog Reader & Archiver work?',
          a: 'Yahoo hosts extensive editorial blogs covering culinary recipes, wellness routines, technology analysis, and fashion. SaveYahoo extracts the main article text and allows saving as Markdown (.md), clean ad-free HTML, or printable PDF reader view.',
        },
        {
          q: 'Does SaveYahoo store or host any media files on its servers?',
          a: 'No. SaveYahoo does not host, store, or re-broadcast any video, audio, or text content. All media streams are parsed on-demand directly from original Yahoo delivery networks to your local browser.',
        },
        {
          q: 'Is it legal to download Yahoo videos and articles?',
          a: 'Downloading content for personal offline viewing, research, and non-commercial fair use is generally permissible where permitted by local law. Users must respect the copyright and intellectual property rights of content owners. Commercial redistribution without authorization is prohibited.',
        },
      ],
    },
    footer: {
      description: 'Fast, high-fidelity browser utility for downloading Yahoo Videos, extracting audio tracks, and archiving blog articles.',
      mediaToolsTitle: 'Media Tools',
      supportedFormatsTitle: 'Supported Formats',
      complianceTitle: 'Compliance & Legal',
      terms: 'Terms of Fair Use',
      privacy: 'Privacy Policy',
      dmca: 'DMCA Contact & Inquiries',
      admin: 'Admin Gateway',
      disclaimer: 'Personal fair-use and educational research utility. Not affiliated with Yahoo Inc.',
      rights: 'SaveYahoo. All rights reserved. Decoupled architecture.',
    },
  },
  fr: {
    nav: {
      videoDownloader: 'Télécharger Vidéo',
      audioConverter: 'Audio MP3',
      blogReader: 'Lecteur d’Articles',
      howItWorks: 'Comment ça marche',
      faq: 'FAQ & Guides',
      quickPaste: 'Coller le Lien',
    },
    hero: {
      tagline: 'Moteur SaveYahoo v2.4 · 100% Gratuit · Sans Logiciel',
      defaultHeadline: 'Téléchargeur de Vidéos, Audios et Blogs Yahoo',
      defaultSubheadline: 'Collez n’importe quelle URL Yahoo News, Sports, Finance ou Lifestyle pour obtenir des vidéos 1080p, du son MP3 320kbps ou des articles sans publicité.',
      inputPlaceholder: 'Collez l’URL Yahoo ici (ex. news.yahoo.com/..., finance.yahoo.com/...)',
      paste: 'Coller',
      pasted: 'Collé',
      download: 'Télécharger',
      fetching: 'Analyse...',
      testPresetsLabel: 'Ou testez avec des exemples en direct :',
      testPresetsHint: 'Cliquez pour prévisualiser',
    },
    card: {
      watchPreview: 'Regarder l’aperçu vidéo',
      closePreview: 'Fermer l’aperçu',
      playingPreview: 'Mode Aperçu · Flux Source Yahoo',
      readerMode: 'Mode Lecture Immédiat',
      originalLink: 'Lien Yahoo Original',
      tabVideo: 'Vidéo Yahoo (MP4)',
      tabAudio: 'Audio Yahoo (MP3 / M4A)',
      tabBlog: 'Lecteur d’Articles & Blogs Yahoo',
      selectQuality: 'Sélectionnez la qualité vidéo à télécharger',
      highSpeedMirror: 'Miroir Haute Vitesse Disponible',
      quality: 'QUALITÉ',
      resolution: 'RÉSOLUTION',
      format: 'FORMAT',
      fileSize: 'TAILLE DU FICHIER',
      audioTrack: 'PISTE AUDIO',
      action: 'ACTION',
      downloadBtn: 'Télécharger',
      downloadingBtn: 'Téléchargement...',
      completedBtn: 'Terminé',
      audioPlayerTitle: 'Écouter l’aperçu de la piste audio',
      included: 'Inclus',
    },
    features: {
      badge: 'Archivage Haute Fidélité',
      title: 'Conçu pour un Archivage Rapide et Sans Bruit',
      subtitle: 'SaveYahoo extrait le flux authentique directement des serveurs Yahoo sans perte de compression ni filigrane intrusif.',
      videoTitle: 'Vidéos Full HD 1080p & 60fps',
      videoDesc: 'Préservez le débit d’origine. Nous extrayons des fichiers MP4 purs directement depuis les serveurs Yahoo sans transcodage.',
      audioTitle: 'Audio MP3 Haute Définition 320kbps',
      audioDesc: 'Extrayez des pistes audio haute fidélité pour vos podcasts et conférences avec métadonnées ID3 intégrées.',
      blogTitle: 'Mode Lecture d’Articles et Recettes',
      blogDesc: 'Supprimez bandeaux, publicités et scripts de suivi des articles Yahoo Lifestyle pour les enregistrer au format Markdown ou PDF.',
    },
    howItWorks: {
      title: 'Comment Télécharger des Médias Yahoo en 4 Étapes Simples',
      subtitle: 'Enregistrez facilement des vidéos, des extraits audio et des articles de blog sans installer aucun logiciel.',
      steps: [
        {
          step: '01',
          title: 'Copiez le Lien Yahoo',
          desc: 'Trouvez la vidéo, l’interview ou l’article sur news.yahoo.com, finance.yahoo.com ou sports.yahoo.com et copiez son adresse URL.',
        },
        {
          step: '02',
          title: 'Collez dans SaveYahoo',
          desc: 'Collez l’URL copiée dans le champ ci-dessus. Notre parseur détecte immédiatement le flux officiel sur le CDN Yahoo.',
        },
        {
          step: '03',
          title: 'Regardez la Prévisualisation',
          desc: 'Cliquez sur le lecteur vidéo pour visionner directement le clip et vérifier la qualité avant de lancer le téléchargement.',
        },
        {
          step: '04',
          title: 'Choisissez la Qualité & Téléchargez',
          desc: 'Sélectionnez votre résolution (1080p MP4, 320k MP3 audio ou document Markdown) et cliquez sur Télécharger pour l’enregistrer hors ligne.',
        },
      ],
    },
    faq: {
      title: 'Foire Aux Questions (FAQ)',
      subtitle: 'Toutes les réponses à vos questions sur les formats, la prévisualisation vidéo, l’extraction audio et la conformité légale.',
      items: [
        {
          q: 'SaveYahoo est-il entièrement gratuit ?',
          a: 'Oui, SaveYahoo est 100% gratuit sans abonnement mensuel, sans inscription, sans carte bancaire ni logiciel à installer. Tous les outils d’extraction vidéo, audio et d’articles s’exécutent directement dans votre navigateur web.',
        },
        {
          q: 'Quelles résolutions et formats vidéo sont disponibles ?',
          a: 'Dès que les serveurs Yahoo les fournissent, SaveYahoo propose le Full HD 1080p, la HD 720p, la qualité standard 480p et la version mobile 360p au format MP4 universel, lisible sur tous les téléphones, tablettes et ordinateurs.',
        },
        {
          q: 'Puis-je regarder l’aperçu vidéo avant de télécharger ?',
          a: 'Absolument ! Cliquez sur le bouton "Regarder l’aperçu vidéo" au centre de la miniature pour démarrer le lecteur multimédia HTML5 directement dans votre navigateur. Vous pouvez faire défiler la barre de lecture, régler le volume et visionner le flux avant de le télécharger.',
        },
        {
          q: 'Puis-je extraire et télécharger l’audio MP3 des interviews Yahoo ?',
          a: 'Oui ! SaveYahoo extrait des fichiers audio MP3 à haut débit (jusqu’à 320 kbps qualité studio) avec normalisation sonore. C’est la solution parfaite pour écouter les conférences Yahoo Finance, résumés de marché ou interviews en déplacement.',
        },
        {
          q: 'Comment fonctionne le lecteur et archiveur de blogs Yahoo ?',
          a: 'Yahoo publie de nombreux blogs éditoriaux sur les recettes de cuisine, le bien-être, la tech et la mode. SaveYahoo extrait le texte principal et permet de le sauvegarder en Markdown (.md), HTML épuré sans publicité ou PDF imprimable.',
        },
        {
          q: 'SaveYahoo héberge-t-il ou conserve-t-il des fichiers sur ses serveurs ?',
          a: 'Non. SaveYahoo n’héberge, ne stocke ni ne rediffuse aucun contenu vidéo, audio ou textuel. Tous les flux multimédias sont analysés à la demande directement depuis les serveurs officiels de Yahoo vers votre terminal.',
        },
        {
          q: 'Est-il légal de télécharger des vidéos et articles Yahoo ?',
          a: 'Le téléchargement pour un visionnage personnel hors ligne, la recherche et l’usage équitable non commercial est généralement autorisé lorsque la législation locale le permet. Les utilisateurs doivent respecter le droit d’auteur. Toute redistribution commerciale non autorisée est interdite.',
        },
      ],
    },
    footer: {
      description: 'Utilitaire de navigation ultra-rapide pour télécharger des vidéos Yahoo, extraire des pistes audio et archiver des articles.',
      mediaToolsTitle: 'Outils Média',
      supportedFormatsTitle: 'Formats Supportés',
      complianceTitle: 'Conformité & Légal',
      terms: 'Conditions d’Utilisation Équitable',
      privacy: 'Politique de Confidentialité',
      dmca: 'Contact DMCA',
      admin: 'Portail Administrateur',
      disclaimer: 'Outil pour usage personnel et éducatif. Non affilié à Yahoo Inc.',
      rights: 'SaveYahoo. Tous droits réservés.',
    },
  },
  es: {
    nav: {
      videoDownloader: 'Descargar Video',
      audioConverter: 'Audio MP3',
      blogReader: 'Lector de Blogs',
      howItWorks: 'Cómo Funciona',
      faq: 'Preguntas Frecuentes',
      quickPaste: 'Pegar Enlace',
    },
    hero: {
      tagline: 'Motor SaveYahoo v2.4 · 100% Gratis · Sin Instalaciones',
      defaultHeadline: 'Descargador de Videos, Audios y Blogs de Yahoo',
      defaultSubheadline: 'Pega cualquier enlace de Yahoo Noticias, Deportes, Finanzas o Estilo de Vida para descargar videos en 1080p, audios MP3 en 320kbps o textos limpios.',
      inputPlaceholder: 'Pega la URL de Yahoo aquí (ej. news.yahoo.com/..., finance.yahoo.com/...)',
      paste: 'Pegar',
      pasted: 'Pegado',
      download: 'Descargar',
      fetching: 'Procesando...',
      testPresetsLabel: 'O prueba con ejemplos reales de Yahoo:',
      testPresetsHint: 'Haz clic en cualquier ejemplo',
    },
    card: {
      watchPreview: 'Ver Vista Previa de Video',
      closePreview: 'Cerrar Vista Previa',
      playingPreview: 'Modo Vista Previa · Flujo Fuente Yahoo',
      readerMode: 'Modo Lector Inmediato',
      originalLink: 'Enlace Yahoo Original',
      tabVideo: 'Video Yahoo (MP4)',
      tabAudio: 'Audio Yahoo (MP3 / M4A)',
      tabBlog: 'Lector de Blogs y Artículos',
      selectQuality: 'Seleccione la calidad de video para descargar',
      highSpeedMirror: 'Servidor Espejo de Alta Velocidad',
      quality: 'CALIDAD',
      resolution: 'RESOLUCIÓN',
      format: 'FORMATO',
      fileSize: 'TAMAÑO',
      audioTrack: 'PISTA DE AUDIO',
      action: 'ACCIÓN',
      downloadBtn: 'Descargar',
      downloadingBtn: 'Descargando...',
      completedBtn: 'Completado',
      audioPlayerTitle: 'Escuchar muestra de audio',
      included: 'Incluido',
    },
    features: {
      badge: 'Archivo de Alta Fidelidad',
      title: 'Diseñado para Descargas Rápidas y Limpias',
      subtitle: 'SaveYahoo extrae la transmisión de origen directamente de los servidores de Yahoo sin pérdidas de compresión ni marcas de agua.',
      videoTitle: 'Videos en Full HD 1080p a 60fps',
      videoDesc: 'Conserva el bitrate original y rango dinámico. Extraemos archivos MP4 intactos directamente sin pérdidas por recodificación.',
      audioTitle: 'Audio MP3 de Estudio a 320kbps',
      audioDesc: 'Extrae pistas de audio con fidelidad superior para entrevistas, llamadas de ganancias y conferencias con etiquetas ID3.',
      blogTitle: 'Modo Lector de Artículos y Blogs',
      blogDesc: 'Elimina anuncios invasivos y rastreadores de artículos y recetas de Yahoo, guardándolos en Markdown o PDF listo para imprimir.',
    },
    howItWorks: {
      title: 'Cómo Descargar Medios de Yahoo en 4 Pasos Sencillos',
      subtitle: 'Guarda videos, pistas de audio y artículos de blog de forma rápida y sin instalar ningún software.',
      steps: [
        {
          step: '01',
          title: 'Copia el Enlace de Yahoo',
          desc: 'Busca el video, podcast o artículo en news.yahoo.com, finance.yahoo.com o sports.yahoo.com y copia la URL de tu navegador.',
        },
        {
          step: '02',
          title: 'Pégalo en SaveYahoo',
          desc: 'Pega la URL en el campo superior. Nuestro analizador detecta de inmediato el flujo oficial en los servidores de Yahoo.',
        },
        {
          step: '03',
          title: 'Mira la Vista Previa',
          desc: 'Haz clic en el reproductor para ver el video en línea y comprobar la calidad antes de comenzar la descarga.',
        },
        {
          step: '04',
          title: 'Elige Calidad y Descarga',
          desc: 'Selecciona la resolución que desees (1080p MP4, 320k MP3 o Markdown) y haz clic en Descargar para guardarlo en tu dispositivo.',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes (FAQ)',
      subtitle: 'Respuestas a dudas comunes sobre formatos, previsualización de video, extracción de audio y cumplimiento legal.',
      items: [
        {
          q: '¿SaveYahoo es completamente gratuito?',
          a: 'Sí, SaveYahoo es 100% gratuito sin cuotas mensuales, sin tarjetas de crédito ni necesidad de instalar programas. Todas las herramientas funcionan directamente en tu navegador.',
        },
        {
          q: '¿Qué resoluciones y formatos de video están disponibles?',
          a: 'Siempre que los servidores de Yahoo lo proporcionen, SaveYahoo ofrece Full HD 1080p, HD 720p, 480p estándar y 360p en formato MP4 compatible con teléfonos, tabletas y ordenadores.',
        },
        {
          q: '¿Puedo ver la vista previa del video antes de descargarlo?',
          a: '¡Por supuesto! Haz clic en el botón "Ver Vista Previa de Video" en la miniatura para iniciar el reproductor HTML5 integrado. Podrás navegar por la línea de tiempo, ajustar el volumen y verificar el video antes de guardarlo.',
        },
        {
          q: '¿Puedo extraer y descargar audio MP3 de entrevistas en video de Yahoo?',
          a: '¡Sí! SaveYahoo extrae audio MP3 de alta fidelidad (hasta 320 kbps calidad de estudio). Es perfecto para escuchar llamadas de resultados financieros de Yahoo Finance o podcasts mientras viajas.',
        },
        {
          q: '¿Cómo funciona el lector y archivador de blogs de Yahoo?',
          a: 'Yahoo publica numerosos artículos de recetas, salud, estilo de vida y tecnología. SaveYahoo extrae el texto limpio y permite guardarlo como Markdown (.md), HTML sin anuncios o PDF imprimible.',
        },
        {
          q: '¿SaveYahoo almacena o aloja archivos en sus servidores?',
          a: 'No. SaveYahoo no almacena ni retransmite contenido en sus servidores. Todos los flujos se analizan en tiempo real directamente desde las redes oficiales de Yahoo hacia tu navegador.',
        },
        {
          q: '¿Es legal descargar videos y artículos de Yahoo?',
          a: 'La descarga de contenido para visualización personal sin conexión, investigación o uso legítimo no comercial está generalmente permitida donde la ley local lo autorice. Los usuarios deben respetar los derechos de autor.',
        },
      ],
    },
    footer: {
      description: 'Herramienta web rápida para descargar videos de Yahoo, extraer pistas de audio y guardar artículos de blogs.',
      mediaToolsTitle: 'Herramientas',
      supportedFormatsTitle: 'Formatos Soportados',
      complianceTitle: 'Legal y Privacidad',
      terms: 'Términos de Uso Justo',
      privacy: 'Política de Privacidad',
      dmca: 'Contacto DMCA',
      admin: 'Acceso de Administrador',
      disclaimer: 'Herramienta para uso personal y educativo. No afiliada a Yahoo Inc.',
      rights: 'SaveYahoo. Todos los derechos reservados.',
    },
  },
  pt: {
    nav: {
      videoDownloader: 'Baixar Vídeo',
      audioConverter: 'Áudio MP3',
      blogReader: 'Leitor de Artigos',
      howItWorks: 'Como Funciona',
      faq: 'Perguntas Frequentes',
      quickPaste: 'Colar Link',
    },
    hero: {
      tagline: 'SaveYahoo Motor v2.4 · 100% Grátis · Sem Programas',
      defaultHeadline: 'Baixar Vídeos, Áudios e Artigos do Yahoo',
      defaultSubheadline: 'Cole qualquer link do Yahoo Notícias, Esportes, Finanças ou Estilo de Vida para baixar vídeos em 1080p, áudios MP3 a 320kbps ou artigos limpos.',
      inputPlaceholder: 'Cole a URL do Yahoo aqui (ex. news.yahoo.com/..., finance.yahoo.com/...)',
      paste: 'Colar',
      pasted: 'Colado',
      download: 'Baixar',
      fetching: 'Obtendo...',
      testPresetsLabel: 'Ou teste com exemplos reais do Yahoo:',
      testPresetsHint: 'Clique para pré-visualizar',
    },
    card: {
      watchPreview: 'Assistir Prévia do Vídeo',
      closePreview: 'Fechar Prévia',
      playingPreview: 'Modo Prévia · Transmissão Original Yahoo',
      readerMode: 'Modo Leitura Imediata',
      originalLink: 'Link Original do Yahoo',
      tabVideo: 'Vídeo do Yahoo (MP4)',
      tabAudio: 'Áudio do Yahoo (MP3 / M4A)',
      tabBlog: 'Leitor de Artigos e Blogs',
      selectQuality: 'Selecione a qualidade do vídeo para baixar',
      highSpeedMirror: 'Espelho de Alta Velocidade Disponível',
      quality: 'QUALIDADE',
      resolution: 'RESOLUÇÃO',
      format: 'FORMATO',
      fileSize: 'TAMANHO',
      audioTrack: 'TRILHA DE ÁUDIO',
      action: 'AÇÃO',
      downloadBtn: 'Baixar',
      downloadingBtn: 'Baixando...',
      completedBtn: 'Concluído',
      audioPlayerTitle: 'Ouvir prévia de áudio',
      included: 'Incluído',
    },
    features: {
      badge: 'Arquivamento Fiel',
      title: 'Desenvolvido para Downloads Rápidos e Limpos',
      subtitle: 'O SaveYahoo extrai a fonte original diretamente dos servidores do Yahoo sem perda de compressão ou marcas d’água.',
      videoTitle: 'Transmissões em Full HD 1080p 60fps',
      videoDesc: 'Preserve taxas de bits originais. Baixe recipientes MP4 puros diretamente sem perdas por recodificação.',
      audioTitle: 'Áudio MP3 de Estúdio em 320kbps',
      audioDesc: 'Extraia trilhas de áudio perfeitas de entrevistas, podcasts e conferências com tags ID3 integradas.',
      blogTitle: 'Modo Leitura Sem Anúncios',
      blogDesc: 'Remova banners intrusivos e rastreadores de receitas e artigos do Yahoo para salvar em Markdown ou PDF para impressão.',
    },
    howItWorks: {
      title: 'Como Baixar Mídias do Yahoo em 4 Passos Fáceis',
      subtitle: 'Salve vídeos, trilhas de áudio e postagens de blog com rapidez e sem instalar softwares.',
      steps: [
        {
          step: '01',
          title: 'Copie o Link do Yahoo',
          desc: 'Encontre o vídeo, entrevista ou artigo no Yahoo Notícias, Yahoo Finanças ou Esportes e copie a URL do navegador.',
        },
        {
          step: '02',
          title: 'Cole no SaveYahoo',
          desc: 'Cole o link no campo superior. Nosso sistema localiza imediatamente o fluxo de mídia oficial na CDN do Yahoo.',
        },
        {
          step: '03',
          title: 'Assista à Prévia do Vídeo',
          desc: 'Clique no reprodutor de vídeo para assistir à transmissão diretamente e conferir a qualidade antes de baixar.',
        },
        {
          step: '04',
          title: 'Escolha a Qualidade e Baixe',
          desc: 'Selecione a resolução desejada (1080p MP4, 320k MP3 ou Markdown) e clique em Baixar para salvar no seu dispositivo.',
        },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes (FAQ)',
      subtitle: 'Respostas para dúvidas comuns sobre formatos, prévia de vídeo, extração de áudio e termos de uso.',
      items: [
        {
          q: 'O SaveYahoo é totalmente gratuito?',
          a: 'Sim, o SaveYahoo é 100% gratuito, sem planos mensais, sem necessidade de cartão de crédito e sem instalação de softwares. Todas as ferramentas funcionam direto no seu navegador.',
        },
        {
          q: 'Quais resoluções e formatos de vídeo estão disponíveis?',
          a: 'Sempre que disponibilizado pelos servidores do Yahoo, o SaveYahoo oferece Full HD 1080p, HD 720p, 480p e 360p em formato MP4 universal compatível com smartphones, tablets e computadores.',
        },
        {
          q: 'Posso assistir à prévia do vídeo antes de baixar?',
          a: 'Com certeza! Clique em "Assistir Prévia do Vídeo" na imagem de capa para abrir o reprodutor HTML5 integrado. Você pode navegar pela linha do tempo, regular o som e checar a transmissão antes de efetuar o download.',
        },
        {
          q: 'Posso extrair e baixar áudio MP3 de entrevistas do Yahoo?',
          a: 'Sim! O SaveYahoo extrai áudio MP3 em alta fidelidade (até 320 kbps qualidade de estúdio) com normalização acústica. Perfeito para ouvir conferências do Yahoo Finanças no dia a dia.',
        },
        {
          q: 'Como funciona o Leitor e Arquivador de Artigos do Yahoo?',
          a: 'O Yahoo possui diversos artigos e blogs sobre culinária, saúde, tecnologia e estilo de vida. O SaveYahoo extrai o texto principal e permite salvá-lo em Markdown (.md), HTML limpo ou PDF para impressão.',
        },
        {
          q: 'O SaveYahoo armazena ou hospeda arquivos nos seus servidores?',
          a: 'Não. O SaveYahoo não armazena nem redistribui conteúdos multimídia. Todas as transmissões são analisadas sob demanda direto das redes oficiais do Yahoo para o seu navegador local.',
        },
        {
          q: 'É legal baixar vídeos e artigos do Yahoo?',
          a: 'O download para consumo pessoal offline, estudo e uso justo não comercial é geralmente permitido conforme a legislação local. Os usuários devem respeitar os direitos autorais dos criadores.',
        },
      ],
    },
    footer: {
      description: 'Utilitário rápido de navegador para baixar vídeos do Yahoo, extrair áudio e arquivar artigos de blogs.',
      mediaToolsTitle: 'Ferramentas',
      supportedFormatsTitle: 'Formatos Suportados',
      complianceTitle: 'Legal e Conformidade',
      terms: 'Termos de Uso Justo',
      privacy: 'Política de Privacidade',
      dmca: 'Contato DMCA',
      admin: 'Acesso Admin',
      disclaimer: 'Ferramenta para uso pessoal e pesquisa educacional. Sem afiliação com o Yahoo Inc.',
      rights: 'SaveYahoo. Todos os direitos reservados.',
    },
  },
  ar: {
    nav: {
      videoDownloader: 'تنزيل الفيديو',
      audioConverter: 'تحويل صوت MP3',
      blogReader: 'قارئ المقالات',
      howItWorks: 'كيف يعمل',
      faq: 'الأسئلة الشائعة',
      quickPaste: 'لصق سريع',
    },
    hero: {
      tagline: 'محرك SaveYahoo الإصدار 2.4 · مجاني 100% · بدون برامج',
      defaultHeadline: 'أداة تنزيل وسائط ومقالات ياهو فائقة السرعة',
      defaultSubheadline: 'الصق أي رابط من ياهو للأخبار أو الرياضة أو المال أو نمط الحياة لتنزيل فيديو 1080p MP4 أو استخراج صوت نقي 320k أو حفظ المقالات بنسق نصي نظيف.',
      inputPlaceholder: 'الصق رابط ياهو هنا (مثال: news.yahoo.com/..., finance.yahoo.com/...)',
      paste: 'لصق',
      pasted: 'تم اللصق',
      download: 'تنزيل',
      fetching: 'جاري الفحص...',
      testPresetsLabel: 'أو جرّب نماذج حقيقية من ياهو:',
      testPresetsHint: 'انقر على أي نموذج للمعاينة',
    },
    card: {
      watchPreview: 'مشاهدة معاينة الفيديو',
      closePreview: 'إغلاق المعاينة',
      playingPreview: 'وضع المعاينة · بث ياهو الأصلي',
      readerMode: 'وضع القراءة الفوري',
      originalLink: 'رابط ياهو الأصلي',
      tabVideo: 'فيديو ياهو (MP4)',
      tabAudio: 'صوت ياهو (MP3 / M4A)',
      tabBlog: 'قارئ مقالات ومدونات ياهو',
      selectQuality: 'اختر دقة الفيديو للتنزيل',
      highSpeedMirror: 'خادم فائق السرعة متوفر',
      quality: 'الجودة',
      resolution: 'الدقة',
      format: 'الصيغة',
      fileSize: 'حجم الملف',
      audioTrack: 'المسار الصوتي',
      action: 'الإجراء',
      downloadBtn: 'تنزيل',
      downloadingBtn: 'جاري التنزيل...',
      completedBtn: 'اكتمل',
      audioPlayerTitle: 'الاستماع لمعاينة الصوت',
      included: 'مضمن',
    },
    features: {
      badge: 'أرشفة عالية الجودة',
      title: 'مصمم للأرشفة السريعة والنظيفة بدون قيود',
      subtitle: 'يقوم SaveYahoo باستخراج تدفق الوسائط الأصلي مباشرة من خوادم ياهو دون فقدان الجودة أو وضع علامات مائية مزعجة.',
      videoTitle: 'فيديو بدقة عالية Full HD 1080p و60 إطار',
      videoDesc: 'حافظ على جودة البث الأصلية ومعدل الإطارات. نستخرج مقاطع MP4 الأصلية مباشرة دون إعادة ترميز تؤثر على الوضوح.',
      audioTitle: 'صوت ستوديو عالي النقاء 320kbps MP3',
      audioDesc: 'استخرج المسارات الصوتية من المؤتمرات الصحفية ومكالمات الأرباح الرياضية والمقابلات مع بيانات ID3 المدمجة.',
      blogTitle: 'وضع القراءة النظيفة لمقالات ياهو',
      blogDesc: 'احصل على المقالات والوصفات الطبية ومقالات التقنية من ياهو مجردة من الإعلانات المزعجة بتنسيق Markdown أو PDF جاهز للطباعة.',
    },
    howItWorks: {
      title: 'كيفية تنزيل وسائط ياهو في 4 خطوات بسيطة',
      subtitle: 'احفظ مقاطع الفيديو والمسارات الصوتية والمقالات بكل سهولة وبدون تثبيت أي برامج خارجية.',
      steps: [
        {
          step: '01',
          title: 'انسخ رابط ياهو',
          desc: 'ابحث عن الفيديو أو المقابلة أو المقال على ياهو للأخبار أو المال أو الرياضة، وانسخ الرابط من شريط المتصفح.',
        },
        {
          step: '02',
          title: 'الصق الرابط في SaveYahoo',
          desc: 'الصق الرابط في مربع الإدخال أعلاه. سيقوم المحرك الذكي بالتعرف فوراً على مصدر البث المباشر من شبكة ياهو.',
        },
        {
          step: '03',
          title: 'شاهد المعاينة المباشرة',
          desc: 'انقر على مشغل الفيديو لمشاهدة المقطع والتأكد من الجودة والمحتوى قبل بدء عملية التنزيل.',
        },
        {
          step: '04',
          title: 'اختر الجودة ونزّل الملف',
          desc: 'اختر التنسيق المناسب (1080p MP4 أو ملف صوتي 320k MP3 أو مقال نصي) واضغط على تنزيل للحفظ الفوري على جهازك.',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة (FAQ)',
      subtitle: 'إجابات شاملة لجميع الاستفسارات المتعلقة بالدقات، ومعاينة الفيديو، واستخراج الصوت، والاستخدام القانوني.',
      items: [
        {
          q: 'هل موقع SaveYahoo مجاني بالكامل؟',
          a: 'نعم، موقع SaveYahoo مجاني 100% بدون أي اشتراكات أو بطاقات ائتمان أو الحاجة لتثبيت أي برامج. جميع أدوات استخراج الفيديو والصوت والمقالات تعمل مباشرة عبر متصفحك.',
        },
        {
          q: 'ما هي صيغ ودقات الفيديو المتاحة؟',
          a: 'طالما كانت متاحة في خوادم ياهو، يوفر SaveYahoo دقات Full HD 1080p وHD 720p والدقة القياسية 480p ودقة الهاتف 360p بصيغة MP4 القياسية المتوافقة مع جميع الهواتف والحواسيب.',
        },
        {
          q: 'هل يمكنني مشاهدة معاينة الفيديو قبل تنزيله؟',
          a: 'بالتأكيد! انقر على زر "مشاهدة معاينة الفيديو" في صورة الغلاف لتشغيل مشغل HTML5 المدمج مباشرة في المتصفح، مما يتيح لك معاينة المحتوى، والتحكم في الصوت، ومراجعة البث قبل التنزيل.',
        },
        {
          q: 'هل يمكنني استخراج وتحميل صوت MP3 من مقابلات ياهو؟',
          a: 'نعم! يستخرج الموقع صوتاً نقياً بمعدل بت يصل إلى 320kbps بجودة الاستوديو، وهو مثالي للاستماع لمكالمات أرباح ياهو المالية والمؤتمرات الصحفية أثناء التنقل.',
        },
        {
          q: 'كيف يعمل قارئ ومؤرشف مقالات ومدونات ياهو؟',
          a: 'تنشر ياهو العديد من مقالات الطبخ والتغذية والتقنية وأسلوب الحياة. يقوم الموقع باستخراج النص النقي مع إمكانية حفظه بصيغة Markdown (.md) أو HTML نظيف بدون إعلانات أو ملف PDF جاهز للطباعة.',
        },
        {
          q: 'هل يحتفظ SaveYahoo بنسخ من الملفات على خوادمه؟',
          a: 'كلا، لا يقوم SaveYahoo بتخزين أو إعادة بث أي ملفات فيديو أو صوت على خوادمه، حيث يتم تحليل الروابط عند الطلب مباشرة من شبكات ياهو إلى جهازك.',
        },
        {
          q: 'هل تنزيل الفيديوهات والمقالات من ياهو قانوني؟',
          a: 'تنزيل المحتوى للمشاهدة الشخصية دون اتصال بالإنترنت ولأغراض البحث والاستخدام العادل غير التجاري مسموح به وفقاً للقوانين المحلية، ويجب دائماً احترام حقوق الملكية الفكرية لأصحاب المحتوى.',
        },
      ],
    },
    footer: {
      description: 'أداة متصفح سريعة وعالية الدقة لتنزيل فيديوهات ياهو واستخراج المقاطع الصوتية وأرشفة المقالات.',
      mediaToolsTitle: 'أدوات الوسائط',
      supportedFormatsTitle: 'الصيغ المدعومة',
      complianceTitle: 'الامتثال والشروط',
      terms: 'شروط الاستخدام العادل',
      privacy: 'سياسة الخصوصية',
      dmca: 'طلبات DMCA والتواصل',
      admin: 'بوابة الإدارة',
      disclaimer: 'أداة للاستخدام الشخصي والبحث التعليمي. غير تابعة لشركة ياهو (Yahoo Inc).',
      rights: 'SaveYahoo. جميع الحقوق محفوظة.',
    },
  },
};
