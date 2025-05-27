Gem::Specification.new do |spec|
  spec.name     = "tumi8-theme"
  spec.version  = "0.0.1"
  spec.authors  = ["Markus Sosnowski", "Sebastian Gallenmüller", "Florian Wiedner"]

  spec.summary  = "A Tum I8 theme for publication pages."
  spec.homepage = "https://github.com/tumi8/tumi8-theme"
  spec.license  = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown|html)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.0", "< 4.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"

  spec.add_development_dependency "bundler"
end
