const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/privacy" className="text-sm hover:text-blue-400 mx-2">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:text-blue-400 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;