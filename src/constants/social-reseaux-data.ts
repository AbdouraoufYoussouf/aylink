import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaXTwitter,
    FaYoutube,
    FaSnapchat,
    FaReddit,
    FaPinterest,
    FaSpotify,
    FaTumblr,
    FaVimeo,
    FaSoundcloud,
    FaSkype,
    FaDiscord,
    FaSteam,
    FaTwitch,
    FaApple,
    FaAmazon,
    FaEtsy,
    FaTelegram,
    FaSignal,
    FaMedium,
    FaViber,
    FaWeibo,
    FaLine,
    FaSlack,
    FaWordpress,
    FaBehance,
    FaDribbble,
    FaFlickr,
    FaMixcloud,
  
  } from "react-icons/fa6";
  import { RiNetflixFill } from "react-icons/ri";
  import { FaMicrosoft ,FaLinkedin} from "react-icons/fa";
  import { FcGoogle } from "react-icons/fc";
  import { IoMdMail } from "react-icons/io";




  export const iconReseaux: IconReseauxType[] = [
    { name: 'Facebook', icon: FaFacebook, color: '#2f55a4' },
    { name: 'Gmail', icon: IoMdMail, color: 'white' },
    { name: 'Instagram', icon: FaInstagram, color: '#405DE6' },
    { name: 'Tiktok', icon: FaTiktok, color: 'white' },
    { name: 'Whatsapp', icon: FaWhatsapp, color: '#25D366' },
    { name: 'Twitter', icon: FaXTwitter, color: 'white' },
    { name: 'Youtube', icon: FaYoutube, color: '#FF0000' },
    { name: 'Telegram', icon: FaTelegram, color: '#0088CC' },
    { name: 'Snapchat', icon: FaSnapchat, color: '#FFFC00' },
    { name: 'Netflix', icon: RiNetflixFill, color: '#E50914' },
    { name: 'LinkedIn', icon: FaLinkedin, color: '#0077B5' },
    { name: 'GitHub', icon: FaGithub, color: 'white' },
    { name: 'Reddit', icon: FaReddit, color: '#FF4500' },
    { name: 'Pinterest', icon: FaPinterest, color: '#BD081C' },
    { name: 'Spotify', icon: FaSpotify, color: '#1ED760' },
    { name: 'Tumblr', icon: FaTumblr, color: '#35465C' },
    { name: 'Vimeo', icon: FaVimeo, color: '#1AB7EA' },
    { name: 'Soundcloud', icon: FaSoundcloud, color: '#FF3300' },
    { name: 'Skype', icon: FaSkype, color: '#00AFF0' },
    { name: 'Discord', icon: FaDiscord, color: '#7289DA' },
    { name: 'Steam', icon: FaSteam, color: '#171A21' },
    { name: 'Twitch', icon: FaTwitch, color: '#6441A5' },
    { name: 'Google', icon: FcGoogle, color: '#4285F4' },
    { name: 'Apple', icon: FaApple, color: '#000000' },
    { name: 'Microsoft', icon: FaMicrosoft, color: '#0078D7' },
    { name: 'Amazon', icon: FaAmazon, color: '#FF9900' },
    { name: 'Etsy', icon: FaEtsy, color: '#D9291C' },
    { name: 'Signal', icon: FaSignal, color: '#0077B5' },
    { name: 'Medium', icon: FaMedium, color: '#02AB6D' },
    { name: 'Viber', icon: FaViber, color: '#665CAC' },
    { name: 'Weibo', icon: FaWeibo, color: '#FDF200' },
    { name: 'Line', icon: FaLine, color: '#00C300' },
    { name: 'Slack', icon: FaSlack, color: '#4A154B' },
    { name: 'WordPress', icon: FaWordpress, color: '#21759B' },
    { name: 'Behance', icon: FaBehance, color: '#1769FF' },
    { name: 'Dribbble', icon: FaDribbble, color: '#EA4C89' },
    { name: 'Flickr', icon: FaFlickr, color: '#0063DC' },
    { name: 'Mixcloud', icon: FaMixcloud, color: '#24CBFF' },
  ];
  
  export interface IconReseauxType {
    name: string;
    icon: React.ElementType;
    color: string;
  }
  