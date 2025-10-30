import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Material = {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  dateTimestamp: number;
  likes: number;
  comments: number;
  downloads: number;
};

type Comment = {
  id: number;
  materialId: number;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
};

type Author = {
  name: string;
  avatar: string;
  bio: string;
  specialization: string;
  materialsCount: number;
  totalLikes: number;
  joined: string;
};

const authors: Record<string, Author> = {
  'Иванова М.П.': {
    name: 'Иванова М.П.',
    avatar: '/placeholder.svg',
    bio: 'Учитель математики высшей категории. Стаж работы 15 лет. Специализируюсь на интерактивных методах обучения и геймификации образовательного процесса.',
    specialization: 'Математика',
    materialsCount: 12,
    totalLikes: 487,
    joined: 'Январь 2023',
  },
  'Петров А.С.': {
    name: 'Петров А.С.',
    avatar: '/placeholder.svg',
    bio: 'Преподаватель литературы. Кандидат педагогических наук. Увлекаюсь проектными методиками и развитием критического мышления через литературный анализ.',
    specialization: 'Литература',
    materialsCount: 8,
    totalLikes: 324,
    joined: 'Март 2023',
  },
  'Сидорова Е.В.': {
    name: 'Сидорова Е.В.',
    avatar: '/placeholder.svg',
    bio: 'Педагог-психолог, методист. Работаю над внедрением технологий развития критического мышления и проблемного обучения в образовательный процесс.',
    specialization: 'Педагогика',
    materialsCount: 15,
    totalLikes: 612,
    joined: 'Февраль 2023',
  },
  'Козлов Д.И.': {
    name: 'Козлов Д.И.',
    avatar: '/placeholder.svg',
    bio: 'Учитель информатики, специалист по цифровым образовательным технологиям. Помогаю коллегам осваивать современные платформы для дистанционного обучения.',
    specialization: 'ИКТ',
    materialsCount: 20,
    totalLikes: 891,
    joined: 'Декабрь 2022',
  },
};

const materials: Material[] = [
  {
    id: 1,
    title: 'Интерактивные методы обучения математике в 5-6 классах',
    description: 'Сборник практических заданий и игровых форм работы для повышения мотивации учащихся на уроках математики.',
    category: 'Математика',
    author: 'Иванова М.П.',
    authorAvatar: '/placeholder.svg',
    date: '15 октября 2024',
    dateTimestamp: new Date('2024-10-15').getTime(),
    likes: 42,
    comments: 8,
    downloads: 156,
  },
  {
    id: 2,
    title: 'Проектная деятельность на уроках литературы',
    description: 'Методические рекомендации по организации проектной работы при изучении классических произведений.',
    category: 'Литература',
    author: 'Петров А.С.',
    authorAvatar: '/placeholder.svg',
    date: '12 октября 2024',
    dateTimestamp: new Date('2024-10-12').getTime(),
    likes: 38,
    comments: 12,
    downloads: 203,
  },
  {
    id: 3,
    title: 'Развитие критического мышления через проблемные ситуации',
    description: 'Практическое руководство по созданию проблемных ситуаций для развития аналитических навыков школьников.',
    category: 'Педагогика',
    author: 'Сидорова Е.В.',
    authorAvatar: '/placeholder.svg',
    date: '10 октября 2024',
    dateTimestamp: new Date('2024-10-10').getTime(),
    likes: 51,
    comments: 15,
    downloads: 278,
  },
  {
    id: 4,
    title: 'Цифровые инструменты для дистанционного обучения',
    description: 'Обзор современных платформ и сервисов для организации эффективного онлайн-обучения.',
    category: 'ИКТ',
    author: 'Козлов Д.И.',
    authorAvatar: '/placeholder.svg',
    date: '8 октября 2024',
    dateTimestamp: new Date('2024-10-08').getTime(),
    likes: 67,
    comments: 22,
    downloads: 412,
  },
];

const initialComments: Comment[] = [
  {
    id: 1,
    materialId: 1,
    author: 'Смирнова О.А.',
    authorAvatar: '/placeholder.svg',
    text: 'Отличная методичка! Использовала несколько игр на своих уроках — дети в восторге. Особенно понравилась идея с математическим квестом.',
    date: '16 октября 2024',
  },
  {
    id: 2,
    materialId: 1,
    author: 'Николаев П.Р.',
    authorAvatar: '/placeholder.svg',
    text: 'Спасибо за материал! Подскажите, пожалуйста, как адаптировать эти методы для работы с детьми с ОВЗ?',
    date: '17 октября 2024',
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('date');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const categories = ['Все', 'Математика', 'Литература', 'Педагогика', 'ИКТ', 'История', 'Биология'];

  const filteredMaterials = materials
    .filter((material) => {
      const matchesSearch =
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || material.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.dateTimestamp - a.dateTimestamp;
      } else if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy === 'downloads') {
        return b.downloads - a.downloads;
      } else if (sortBy === 'comments') {
        return b.comments - a.comments;
      }
      return 0;
    });

  const handleAddComment = () => {
    if (newComment.trim() && selectedMaterial) {
      const comment: Comment = {
        id: comments.length + 1,
        materialId: selectedMaterial.id,
        author: 'Вы',
        authorAvatar: '/placeholder.svg',
        text: newComment,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const materialComments = comments.filter((c) => c.materialId === selectedMaterial?.id);

  const authorMaterials = selectedAuthor ? materials.filter((m) => m.author === selectedAuthor) : [];
  const authorData = selectedAuthor ? authors[selectedAuthor] : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="BookOpen" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">МетодКопилка</h1>
                <p className="text-sm text-muted-foreground">Портал для педагогов</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Категории
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => { setSelectedMaterial(null); setSelectedAuthor('Иванова М.П.'); }}>
                <Icon name="Users" size={18} className="mr-2" />
                Авторы
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Методические разработки для современных педагогов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Обменивайтесь опытом, находите проверенные материалы и развивайте свои методики вместе с коллегами
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск методических материалов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">По дате публикации</SelectItem>
                  <SelectItem value="likes">По популярности</SelectItem>
                  <SelectItem value="downloads">По загрузкам</SelectItem>
                  <SelectItem value="comments">По обсуждаемости</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredMaterials.map((material) => (
            <Card
              key={material.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => setSelectedMaterial(material)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-3">
                    {material.category}
                  </Badge>
                  <Button variant="ghost" size="icon" className="hover:text-red-500">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
                <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                  {material.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">{material.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedAuthor(material.author); }}>
                    <AvatarImage src={material.authorAvatar} />
                    <AvatarFallback>{material.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm cursor-pointer hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedAuthor(material.author); }}>{material.author}</p>
                    <p className="text-xs text-muted-foreground">{material.date}</p>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={16} />
                    <span>{material.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={16} />
                    <span>{material.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Download" size={16} />
                    <span>{material.downloads}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedAuthor && authorData && (
          <Card className="border-2 border-secondary/30 shadow-xl mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={authorData.avatar} />
                    <AvatarFallback>{authorData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl mb-1">{authorData.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {authorData.specialization}
                    </Badge>
                    <p className="text-sm text-muted-foreground">На платформе с {authorData.joined}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedAuthor(null)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base mb-6">{authorData.bio}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{authorData.materialsCount}</div>
                    <p className="text-sm text-muted-foreground">Публикаций</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">{authorData.totalLikes}</div>
                    <p className="text-sm text-muted-foreground">Лайков</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{authorMaterials.reduce((sum, m) => sum + m.downloads, 0)}</div>
                    <p className="text-sm text-muted-foreground">Загрузок</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-6" />

              <h3 className="text-xl font-bold mb-4">Публикации автора</h3>
              <div className="space-y-4">
                {authorMaterials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => { setSelectedMaterial(material); setSelectedAuthor(null); }}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">{material.category}</Badge>
                          <CardTitle className="text-lg mb-2">{material.title}</CardTitle>
                          <CardDescription>{material.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Heart" size={16} />
                          <span>{material.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MessageCircle" size={16} />
                          <span>{material.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Download" size={16} />
                          <span>{material.downloads}</span>
                        </div>
                        <div className="ml-auto text-xs">{material.date}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedMaterial && (
          <Card className="border-2 border-primary/30 shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-3">
                  {selectedMaterial.category}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMaterial(null)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <CardTitle className="text-2xl">{selectedMaterial.title}</CardTitle>
              <CardDescription className="text-base mt-2">{selectedMaterial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-12 h-12 cursor-pointer" onClick={() => setSelectedAuthor(selectedMaterial.author)}>
                  <AvatarImage src={selectedMaterial.authorAvatar} />
                  <AvatarFallback>{selectedMaterial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedAuthor(selectedMaterial.author)}>{selectedMaterial.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedMaterial.date}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <Button className="flex-1">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать материал
                </Button>
                <Button variant="outline">
                  <Icon name="Heart" size={18} className="mr-2" />
                  {selectedMaterial.likes}
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Обсуждение ({materialComments.length})
                </h3>

                <div className="space-y-6 mb-6">
                  {materialComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.authorAvatar} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <p className="font-semibold mb-3">Добавить комментарий</p>
                  <Textarea
                    placeholder="Поделитесь своим опытом использования методики..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3 min-h-[100px]"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3">О проекте</h4>
              <p className="text-sm text-muted-foreground">
                МетодКопилка — платформа для обмена педагогическим опытом и методическими разработками
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Методические материалы</li>
                <li>Категории</li>
                <li>Авторы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Контакты</h4>
              <p className="text-sm text-muted-foreground">info@metodkopilka.ru</p>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">© 2024 МетодКопилка. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}