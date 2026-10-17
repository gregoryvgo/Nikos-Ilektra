import { n as createComponent, r as __exportAll, t as createAstro } from "./compiler_B7xD41-_.mjs";
import { g as addAttribute, h as renderHead, i as renderComponent, m as maybeRenderHead, s as renderSlot, u as renderTemplate } from "./server_DOF18fpW.mjs";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Calendar, CalendarPlus, Check, ChevronLeft, ChevronRight, Clock3, Code2, Copy, Download, Gift, Heart, MapPin, Navigation, Phone, Sparkles } from "lucide-react";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Νίκος & Ηλέκτρα - Προσκλητήριο Γάμου", description = "Σας προσκαλούμε να γιορτάσετε μαζί μας την πιο ξεχωριστή ημέρα της ζωής μας!", image = "/images/wedding.jpg" } = Astro.props;
	const canonicalURL = new URL(Astro.url.pathname, "https://nikos-ilektra.vgogenius.gr");
	const socialImageURL = new URL(image, canonicalURL).href;
	return renderTemplate`<html lang="el" class="scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="icon" type="image/png" href="/favicon.png"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="https://nikos-ilektra.vgogenius.gr/images/wedding.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(socialImageURL, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=GFS+Bodoni:ital,wght@0,400;0,700;1,400&family=GFS+Didot&family=Marck+Script&family=Montserrat:wght@200;300;400;500&display=swap&subset=greek,greek-ext" rel="stylesheet">${renderHead($$result)}</head><body class="bg-[#fcfaf7] text-stone-800 antialiased selection:bg-[#c5a880]/20 selection:text-[#a68a56]">${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/VideoEnvelope.tsx
var VideoEnvelope = ({ groom = "Νίκος", bride = "Ηλέκτρα", imageSrc = "/images/nikos-proskitirio.png", videoSrc = "/Wedding_invitation_envelope_opens_1080p_202608172336.mp4" }) => {
	const [isOpened, setIsOpened] = useState(false);
	const videoRef = useRef(null);
	const handlePlayOrLoad = () => {
		if (videoRef.current) videoRef.current.playbackRate = 1.65;
	};
	const handleTimeUpdate = () => {
		if (videoRef.current) {
			if (videoRef.current.duration - videoRef.current.currentTime <= 1 && !isOpened) setIsOpened(true);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "relative w-full h-[100dvh] flex items-center justify-center bg-[#f3f7fb] overflow-hidden select-none m-0 p-0",
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative w-full max-w-[420px] h-full bg-[#f3f7fb] overflow-hidden flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ jsx("video", {
				ref: videoRef,
				src: videoSrc,
				autoPlay: true,
				playsInline: true,
				muted: true,
				onPlay: handlePlayOrLoad,
				onLoadedMetadata: handlePlayOrLoad,
				onTimeUpdate: handleTimeUpdate,
				className: "absolute inset-0 w-full h-full object-cover"
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: isOpened && /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					scale: .85
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: 2.2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative z-20 w-full h-full flex flex-col items-center justify-center p-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "w-full h-full max-h-[88dvh] flex items-center justify-center",
					children: /* @__PURE__ */ jsx("img", {
						src: imageSrc,
						alt: `${groom} & ${bride}`,
						className: "w-full h-full max-w-full max-h-full object-contain drop-shadow-xl"
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: .7 },
					transition: {
						delay: 1,
						duration: .8
					},
					className: "absolute bottom-3 flex flex-col items-center cursor-pointer",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-sans text-[9px] tracking-[0.2em] uppercase text-[#0c1b33] mb-0.5 font-medium",
						children: "Scroll"
					}), /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gradient-to-b from-[#0c1b33] to-transparent animate-bounce" })]
				})]
			}) })]
		})
	});
};
//#endregion
//#region src/components/Countdown.tsx
var Countdown = ({ targetDate, formattedDate }) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +/* @__PURE__ */ new Date();
		let timeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		};
		if (difference > 0) timeLeft = {
			days: Math.floor(difference / 864e5),
			hours: Math.floor(difference / 36e5 % 24),
			minutes: Math.floor(difference / 1e3 / 60 % 60),
			seconds: Math.floor(difference / 1e3 % 60)
		};
		return timeLeft;
	};
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1e3);
		return () => clearInterval(timer);
	}, [targetDate]);
	const getGoogleCalendarUrl = () => {
		const event = {
			title: "Γάμος νίκος & Ηλέκτρα",
			description: "Σας περιμένουμε στον γάμο μας!",
			location: "Ι.Ν Εσταυρωμένου Εσταυρωμένου Εσταυρωμένου. Αγίου Δημητρίου",
			start: "20280928T160000Z",
			end: "20280928T230000Z"
		};
		return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
	};
	const downloadIcsFile = () => {
		const icsData = [
			"BEGIN:VCALENDAR",
			"VERSION:2.0",
			"PRODID:-//vgogenius//Wedding Invitation//EL",
			"BEGIN:VEVENT",
			"SUMMARY:Γάμος Νίκος & Ηλέκτρα",
			"DESCRIPTION:Σας περιμένουμε στον γάμο μας!",
			"LOCATION:Ι.Ν. Εσταυρωμένου",
			"DTSTART:20280928T160000Z",
			"DTEND:20280928T230000Z",
			"END:VEVENT",
			"END:VCALENDAR"
		].join("\r\n");
		const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute("download", "wedding-invite.ics");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const timeUnits = [
		{
			label: "Ημέρες",
			value: timeLeft.days
		},
		{
			label: "Ώρες",
			value: timeLeft.hours
		},
		{
			label: "Λεπτά",
			value: timeLeft.minutes
		},
		{
			label: "Δεύτερα",
			value: timeLeft.seconds
		}
	];
	return /* @__PURE__ */ jsx("div", {
		className: "pt-6 pb-16 px-6 bg-[#f3f7fb] text-center m-0 border-0",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-sm mx-auto space-y-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase",
							children: "Αντίστροφη Μέτρηση"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-bodoni italic text-3xl sm:text-4xl font-normal tracking-wide text-[#0c1b33]",
							children: "Η Μεγάλη Μέρα"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2 pt-1",
							children: [
								/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" }),
								/* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-[#4a729c]" }),
								/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" })
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-didot text-sm sm:text-base text-[#0c1b33] tracking-widest uppercase pt-1 font-medium",
							children: formattedDate
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-4 gap-2.5",
					children: timeUnits.map((unit, index) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white py-3.5 px-2 rounded-2xl border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.05)] flex flex-col items-center justify-center space-y-1",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-didot text-2xl sm:text-3xl font-semibold text-[#0c1b33] tracking-tight",
							children: String(unit.value).padStart(2, "0")
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bodoni italic text-[11px] text-[#0c1b33]/70 tracking-wider",
							children: unit.label
						})]
					}, index))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2.5 pt-2",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-bodoni italic text-sm text-[#0c1b33]/80",
						children: "Αποθηκεύστε την ημερομηνία"
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ jsxs("a", {
							href: getGoogleCalendarUrl(),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 text-[11px] font-sans font-medium transition-all shadow-sm active:scale-95",
							children: [/* @__PURE__ */ jsx(CalendarPlus, { className: "w-3.5 h-3.5 text-[#4a729c]" }), /* @__PURE__ */ jsx("span", { children: "Google Calendar" })]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: downloadIcsFile,
							type: "button",
							className: "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 text-[11px] font-sans font-medium transition-all shadow-sm active:scale-95 cursor-pointer",
							children: [/* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 text-[#4a729c]" }), /* @__PURE__ */ jsx("span", { children: "Apple / Outlook" })]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-3 pt-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-bodoni italic text-base sm:text-lg text-[#0c1b33] leading-relaxed",
						children: [
							"Παρακαλούμε επιβεβαιώστε την παρουσία σας ",
							/* @__PURE__ */ jsx("br", {}),
							"έως τις",
							" ",
							/* @__PURE__ */ jsx("strong", {
								className: "font-semibold not-italic text-[#4a729c] whitespace-nowrap",
								children: "10/12/2026"
							}),
							"."
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "font-bodoni italic font-semibold text-xl sm:text-2xl text-[#4a729c]",
						children: "Θα χαρούμε πολύ να σας δούμε!"
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/components/Story.tsx
var defaultImages = [
	"/images/20251117_170012.jpg",
	"/images/Messenger_creation_FECBF82D-8453-4B02-B251-864E466C72D0.jpeg",
	"/images/IMG-d802b9d34b2fddf9e6d2446e679ed884-V.jpg",
	"/images/IMG-20221106-WA0003.jpg",
	"/images/IMG-20220619-WA0002.jpg",
	"/images/20240318_183927.jpg",
	"/images/Messenger_creation_1447DC2B-36B5-4A4A-8306-6288031966AB.jpeg",
	"/images/VideoCapture_20260407-090602.jpg"
];
var swipeConfidenceThreshold = 1e4;
var swipePower = (offset, velocity) => {
	return Math.abs(offset) * velocity;
};
var Story = ({ title = "Πώς γνωριστήκαμε", images = defaultImages }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(1);
	const [isPaused, setIsPaused] = useState(false);
	useEffect(() => {
		if (isPaused || images.length <= 1) return;
		const timer = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 5e3);
		return () => clearInterval(timer);
	}, [images.length, isPaused]);
	const paginate = (newDirection) => {
		setDirection(newDirection);
		setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
	};
	const handleDragEnd = (_, { offset, velocity }) => {
		const swipe = swipePower(offset.x, velocity.x);
		if (swipe < -1e4 || offset.x < -50) paginate(1);
		else if (swipe > swipeConfidenceThreshold || offset.x > 50) paginate(-1);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in-section py-20 px-6 bg-white text-center border-t border-stone-100 relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-[#edf4fa]/60 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-[#edf4fa]/60 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-xl mx-auto space-y-10 relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-center gap-1 text-[#4a729c]",
								children: [
									/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 opacity-80" }),
									/* @__PURE__ */ jsx("p", {
										className: "font-didot text-xs tracking-[0.3em] uppercase",
										children: "Η Ιστορία Μας"
									}),
									/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 opacity-80" })
								]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide",
								children: title
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-center gap-2 pt-1",
								children: [
									/* @__PURE__ */ jsx("div", { className: "w-10 h-px bg-[#0c1b33]/25" }),
									/* @__PURE__ */ jsx(Heart, { className: "w-3.5 h-3.5 text-[#0c1b33] fill-[#0c1b33]/20" }),
									/* @__PURE__ */ jsx("div", { className: "w-10 h-px bg-[#0c1b33]/25" })
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto w-full max-w-[480px] group select-none",
						onMouseEnter: () => setIsPaused(true),
						onMouseLeave: () => setIsPaused(false),
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#edf4fa] rounded-2xl rotate-[3deg] shadow-xs border border-[#dce8f2] pointer-events-none" }),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#e4eff8] rounded-2xl rotate-[-2deg] opacity-70 pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative bg-white p-4 sm:p-5 rounded-2xl shadow-[0_16px_40px_rgba(12,27,51,0.06)] border border-[#dce8f2]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 cursor-grab active:cursor-grabbing touch-pan-y",
									children: [
										/* @__PURE__ */ jsx(AnimatePresence, {
											initial: false,
											custom: direction,
											children: /* @__PURE__ */ jsx(motion.img, {
												src: images[currentIndex],
												alt: `Couple moment ${currentIndex + 1}`,
												custom: direction,
												drag: "x",
												dragConstraints: {
													left: 0,
													right: 0
												},
												dragElastic: .8,
												onDragStart: () => setIsPaused(true),
												onDragEnd: handleDragEnd,
												initial: {
													opacity: 0,
													x: direction * 100
												},
												animate: {
													opacity: 1,
													x: 0
												},
												exit: {
													opacity: 0,
													x: -direction * 100
												},
												transition: {
													x: {
														type: "spring",
														stiffness: 300,
														damping: 30
													},
													opacity: { duration: .35 }
												},
												className: "absolute inset-0 h-full w-full object-cover pointer-events-auto",
												draggable: false,
												loading: "lazy"
											}, currentIndex)
										}),
										images.length > 1 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => paginate(-1),
											"aria-label": "Προηγούμενη φωτογραφία",
											className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0c1b33] shadow-md flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer opacity-85 hover:opacity-100 z-20",
											children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => paginate(1),
											"aria-label": "Επόμενη φωτογραφία",
											className: "absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0c1b33] shadow-md flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer opacity-85 hover:opacity-100 z-20",
											children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0c1b33]/65 backdrop-blur-md text-xs font-didot text-white tracking-widest pointer-events-none z-20",
											children: [
												currentIndex + 1,
												" / ",
												images.length
											]
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "pt-4 pb-1 flex flex-col items-center gap-2",
									children: images.length > 1 && /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-1.5 pt-0.5",
										children: images.map((_, i) => /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => {
												setDirection(i > currentIndex ? 1 : -1);
												setCurrentIndex(i);
											},
											"aria-label": `Φωτογραφία ${i + 1}`,
											className: `h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? "w-6 bg-[#0c1b33]" : "w-1.5 bg-[#0c1b33]/20 hover:bg-[#0c1b33]/40"}`
										}, i))
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative px-7 py-8 rounded-2xl bg-[#f3f7fb] border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)]",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-bodoni italic text-6xl text-[#4a729c]/25 absolute -top-4 left-3 select-none leading-none",
								children: "“"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "font-serif text-base sm:text-lg leading-relaxed text-stone-700 font-light text-justify pt-3 px-1 space-y-5",
								children: [
									/* @__PURE__ */ jsx("p", { children: "Όλα ξεκίνησαν σαν μια τυχαία σύμπτωση σε μια πόλη που δεν ησυχάζει ποτέ. Δύο παράλληλες διαδρομές που, χωρίς να το γνωρίζουν, βάδιζαν προς το ίδιο σημείο συνάντησης. Μια ματιά, ένα αυθόρμητο χαμόγελο και μια πρώτη συζήτηση έμοιαζε να μην έχει τέλος ήταν αρκετά για να αλλάξουν τα πάντα." }),
									/* @__PURE__ */ jsx("p", { children: "Από εκείνη τη στιγμή, η καθημερινότητα απέκτησε άλλο νόημα. Τα βράδια γέμισαν με ατελείωτες βόλτες, τα ταξίδια έγιναν κοινές εμπειρίες και οι μικρές, απλές στιγμές μετατράπηκαν στις πιο όμορφες αναμνήσεις. Μέσα από τα γέλια, τα όνειρα, αλλά και τις προκλήσεις, ανακαλύψαμε ότι το σπίτι μας δεν είναι ένας τόπος, αλλά ο ένας δίπλα στον άλλον." }),
									/* @__PURE__ */ jsx("p", { children: "Σήμερα, με την ίδια βαθιά αγάπη και την υπόσχεση να μοιραζόμαστε κάθε επόμενη σελίδα, επιλέγουμε να ενώσουμε τις ζωές μας για πάντα, ξεκινώντας το πιο όμορφο κοινό μας κεφάλαιο." })
								]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "font-bodoni italic text-6xl text-[#4a729c]/25 absolute -bottom-6 right-3 select-none leading-none",
								children: "”"
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/Locations.tsx
var Locations = ({ ceremony, reception }) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	const renderLocation = (location) => /* @__PURE__ */ jsxs("div", {
		className: "rounded-[28px] border border-[#dce8f2] bg-[#f7fafc] p-4 shadow-[0_8px_28px_rgba(12,27,51,0.04)]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf2fb] text-[#4a729c]",
					children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] font-semibold uppercase tracking-[0.28em] text-[#4a729c]",
					children: location.title
				}), /* @__PURE__ */ jsx("h3", {
					className: "font-bodoni text-xl text-[#0c1b33]",
					children: location.name
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 space-y-2 text-sm text-[#0c1b33]/80",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4 text-[#4a729c]" }), /* @__PURE__ */ jsx("span", { children: location.time })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-[#4a729c]" }), /* @__PURE__ */ jsx("span", { children: location.address })]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-hidden rounded-2xl border border-[#dce8f2] bg-white",
				children: /* @__PURE__ */ jsx("iframe", {
					src: location.embedUrl,
					title: location.name,
					className: "h-48 w-full border-0",
					loading: "lazy",
					referrerPolicy: "no-referrer-when-downgrade"
				})
			}),
			/* @__PURE__ */ jsxs("a", {
				href: location.mapQuery,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-4 inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4a729c]",
				children: [/* @__PURE__ */ jsx(Navigation, { className: "h-3.5 w-3.5" }), "Πλοήγηση"]
			})
		]
	}, location.name);
	return /* @__PURE__ */ jsx("section", {
		className: `fade-in-section bg-white px-6 py-16 text-center ${isMounted ? "is-visible" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8 space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase",
					children: "Το μέρος μας"
				}), /* @__PURE__ */ jsx("h2", {
					className: "font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide",
					children: "Τοποθεσίες"
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [renderLocation(ceremony), renderLocation(reception)]
			})]
		})
	});
};
//#endregion
//#region src/components/Crew.tsx
var defaultCrew = [
	{
		name: "Νίκος",
		role: "Γαμπρός",
		quote: "",
		phone: "+30 690 000 0001"
	},
	{
		name: "Ηλέκτρα",
		role: "Νύφη",
		quote: "",
		phone: "+30 690 000 0002"
	},
	{
		name: "Νικόλας",
		role: "Κουμπάρος",
		quote: "Έτοιμος για το ρύζι και το καλύτερο πάρτι!",
		phone: "+30 690 000 0003"
	},
	{
		name: "Καλλιόπη",
		role: "Κουμπάρα",
		quote: "Δίπλα τους σε κάθε βήμα αυτής της όμορφης διαδρομής!",
		phone: "+30 690 000 0004"
	}
];
var Crew = ({ members = defaultCrew }) => {
	const displayMembers = members && members.length > 0 ? members : defaultCrew;
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in-section py-16 px-6 bg-white text-center border-t border-stone-100",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-2 mb-12",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase",
					children: "Οι Πρωταγωνιστες"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide",
					children: "The Crew"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center gap-2 pt-1",
					children: [
						/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" }),
						/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-[#4a729c]" }),
						/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" })
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-6 max-w-sm mx-auto",
			children: displayMembers.map((member, index) => {
				return /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center p-6 rounded-2xl bg-[#f3f7fb] border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)] transition-transform duration-300 hover:scale-[1.02]",
					children: [
						member.image && /* @__PURE__ */ jsx("div", {
							className: "w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#0c1b33]/15 shadow-md bg-stone-100",
							children: /* @__PURE__ */ jsx("img", {
								src: member.image,
								alt: member.name,
								className: "w-full h-full object-cover"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mb-2",
							children: /* @__PURE__ */ jsx("span", {
								className: "bg-[#0c1b33] text-white text-xs uppercase font-didot tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap border border-white/20",
								children: member.role
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 mt-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-bodoni font-medium text-[#0c1b33] tracking-wide whitespace-pre-line leading-snug text-xl sm:text-2xl",
								children: member.name
							}), member.quote && member.quote.trim() !== "" && /* @__PURE__ */ jsxs("p", {
								className: "font-sans italic text-xs text-stone-500 max-w-[240px] leading-relaxed",
								children: [
									"\"",
									member.quote,
									"\""
								]
							})]
						}),
						member.phone && member.phone.trim() !== "" && /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-3 mt-4",
							children: /* @__PURE__ */ jsxs("a", {
								href: `tel:${member.phone}`,
								className: "flex items-center gap-2 bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 px-5 py-2.5 rounded-full text-sm font-sans tracking-wide transition-all shadow-xs active:scale-95 font-medium",
								children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-[#4a729c]" }), /* @__PURE__ */ jsx("span", { children: member.phone })]
							})
						})
					]
				}, index);
			})
		})]
	});
};
//#endregion
//#region src/components/GiftRegistry.tsx
var GiftRegistry = ({ bankName = "Τράπεζα Πειραιώς", iban = "GR2301727090005709119954638", beneficiary = "Νίκος & Ηλέκτρα" }) => {
	const [isMounted, setIsMounted] = useState(false);
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	const handleCopy = async () => {
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(iban);
			else {
				const textArea = document.createElement("textarea");
				textArea.value = iban;
				textArea.style.position = "fixed";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch (err) {
			console.error("Αποτυχία αντιγραφής:", err);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: `fade-in-section py-16 px-6 bg-[#f3f7fb] text-center border-t border-[#dce8f2] ${isMounted ? "is-visible" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-sm mx-auto space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase",
							children: "Λιστα Γαμου"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide",
							children: "Προαιρετική Συνεισφορά"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2 pt-1",
							children: [
								/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" }),
								/* @__PURE__ */ jsx(Gift, { className: "w-3.5 h-3.5 text-[#4a729c]" }),
								/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-[#0c1b33]/25" })
							]
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "font-sans text-xs text-[#0c1b33]/85 font-normal leading-relaxed px-4",
					children: "Η παρουσία σας είναι το ομορφότερο δώρο για εμάς. Εάν ωστόσο επιθυμείτε να συμβάλετε στο ξεκίνημα της νέας μας ζωής:"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(12,27,51,0.04)] border border-[#dce8f2] space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-didot text-sm tracking-widest text-[#0c1b33] uppercase font-semibold block",
								children: bankName
							}), /* @__PURE__ */ jsxs("p", {
								className: "font-sans text-xs text-[#4a729c] font-normal",
								children: ["Δικαιούχοι: ", /* @__PURE__ */ jsx("span", {
									className: "font-normal text-[#4a729c]",
									children: beneficiary
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-[#f3f7fb] p-3.5 rounded-xl border border-[#dce8f2]",
							children: /* @__PURE__ */ jsx("p", {
								className: "font-mono text-xs sm:text-[13px] tracking-wider text-[#0c1b33] break-all select-all font-medium",
								children: iban
							})
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: handleCopy,
							className: `w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-didot tracking-widest uppercase transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${copied ? "bg-emerald-600 text-white shadow-emerald-200" : "bg-[#0c1b33] hover:bg-[#183059] text-white shadow-md"}`,
							children: copied ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", { children: "Αντιγραφηκε!" })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Copy, { className: "w-4 h-4 text-[#fcfbf9]" }), /* @__PURE__ */ jsx("span", { children: "Αντιγραφη IBAN" })] })
						})
					]
				})
			]
		})
	});
};
//#endregion
//#region src/components/Footer.tsx
var Footer = ({ groom, bride, year = "2027" }) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	return /* @__PURE__ */ jsx("footer", {
		className: `fade-in-section py-12 px-6 bg-white text-center border-t border-[#dce8f2] ${isMounted ? "is-visible" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-sm mx-auto space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-serif text-2xl font-light tracking-wider text-[#b89753]",
						children: [
							groom,
							" & ",
							bride
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-1.5 text-[#4a729c] text-xs",
						children: [/* @__PURE__ */ jsx(Heart, { className: "w-3 h-3 text-[#4a729c] fill-[#4a729c]/80" }), /* @__PURE__ */ jsx("span", {
							className: "font-serif italic",
							children: year
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", { className: "w-12 h-px bg-[#0c1b33]/15 mx-auto" }),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-sans text-[11px] text-[#0c1b33]/80 font-normal flex items-center justify-center gap-1.5",
						children: [/* @__PURE__ */ jsx(Code2, { className: "w-3.5 h-3.5 text-[#0c1b33]" }), "Σχεδιάστηκε με αγάπη από"]
					}), /* @__PURE__ */ jsx("a", {
						href: "https://vgogenius.gr",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-block font-sans text-xs font-medium tracking-widest text-[#4a729c] hover:text-[#0c1b33] uppercase transition-colors hover:underline underline-offset-4",
						children: "vgogenius.gr"
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/data/event.ts
var eventData = {
	couple: {
		groom: "Νίκος",
		bride: "Ηλέκτρα",
		hashtag: "#ΝίκοςΗλέκτρα2027"
	},
	eventDate: "2027-01-10T16:00:00",
	formattedDate: "Κυριακή 10 Ιανουαρίου 2027",
	locations: {
		ceremony: {
			title: "Το Μυστήριο",
			time: "12:30",
			name: "Ιερός Ναός Υψώσεως Τιμίου Σταυρού\n(Εσταυρωμένος)",
			address: "Αιγάλεω, Αττική",
			mapQuery: "https://www.google.com/maps/dir/?api=1&destination=Ieros+Naos+Ypsoseos+Timiou+Stavrou+Aigaleo",
			embedUrl: "https://maps.google.com/maps?q=Plateia+Estavromenou+Aigaleo&t=&z=15&ie=UTF8&iwloc=&output=embed"
		},
		reception: {
			title: "Η Δεξίωση",
			time: "15:00",
			name: "Κτήμα 28",
			address: "Καπανδρίτι, Αττική",
			mapQuery: "https://www.google.com/maps/dir/?api=1&destination=Ktima+28+Kapandriti",
			embedUrl: "https://maps.google.com/maps?q=Ktima+28+Kapandriti&t=&z=15&ie=UTF8&iwloc=&output=embed"
		}
	},
	story: {
		title: "Πώς γνωριστήκαμε",
		text: "Όλα ξεκίνησαν σαν μια τυχαία σύμπτωση σε μια πόλη που δεν ησυχάζει ποτέ. Δύο παράλληλες διαδρομές που, χωρίς να το γνωρίζουν, βάδιζαν προς το ίδιο σημείο συνάντησης. Μια ματιά, ένα αυθόρμητο χαμόγελο και μια πρώτη συζήτηση που έμοιαζε να μην έχει τέλος ήταν αρκετά για να αλλάξουν τα πάντα. Από εκείνη τη στιγμή, η καθημερινότητα απέκτησε άλλο νόημα. Τα βράδια γέμισαν με ατελείωτες βόλτες, τα ταξίδια έγιναν κοινές εμπειρίες και οι μικρές, απλές στιγμές μετατράπηκαν στις πιο όμορφες αναμνήσεις. Μέσα από τα γέλια, τα όνειρα, αλλά και τις προκλήσεις, ανακαλύψαμε ότι το σπίτι μας δεν είναι ένας τόπος, αλλά ο ένας δίπλα στον άλλον. Σήμερα, με την ίδια βαθιά αγάπη και την υπόσχεση να μοιραζόμαστε κάθε επόμενη σελίδα, επιλέγουμε να ενώσουμε τις ζωές μας για πάντα, ξεκινώντας το πιο όμορφο κοινό μας κεφάλαιο."
	},
	crew: [
		{
			name: "Νίκος",
			role: "Γαμπρός",
			phone: "+306948057742",
			image: "/images/FB_IMG_1717614596508.jpg"
		},
		{
			name: "Ηλέκτρα",
			role: "Νύφη",
			phone: "+306907367525",
			image: "/images/IMG-0d5e919d4f1c95d7cd513e38892b23d0-V.jpg"
		},
		{
			name: "Νικόλας Μπιλάλης\nΒασίλης & Καλλιόπη Παπαδημητρίου",
			role: "Κουμπάροι"
		}
	],
	bankAccount: {
		bankName: "Τράπεζα Πειραιώς",
		iban: "GR2301727090005709119954638",
		beneficiary: "Νίκος & Ηλέκτρα"
	},
	rsvpDeadline: "10 Δεκεμβρίου 2026"
};
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${eventData.couple.groom} & ${eventData.couple.bride} Προσκλητήριο` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex flex-col min-h-screen">${renderComponent($$result, "VideoEnvelope", VideoEnvelope, {
		"client:load": true,
		"groom": eventData.couple.groom,
		"bride": eventData.couple.bride,
		"date": eventData.formattedDate,
		"churchName": "Ι.Ν. Εσταυρωμένου Αιγάλεω",
		"imageSrc": "/images/nikos-proskitirio.png",
		"videoSrc": "/Wedding_invitation_envelope_opens_1080p_202608172336.mp4",
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/VideoEnvelope.tsx",
		"client:component-export": "VideoEnvelope"
	})}${renderComponent($$result, "Countdown", Countdown, {
		"client:load": true,
		"targetDate": eventData.eventDate,
		"formattedDate": eventData.formattedDate,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Countdown.tsx",
		"client:component-export": "Countdown"
	})}${renderComponent($$result, "Story", Story, {
		"client:visible": true,
		"title": eventData.story.title,
		"text": eventData.story.text,
		"coupleHashtag": eventData.couple.hashtag,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Story.tsx",
		"client:component-export": "Story"
	})}${renderComponent($$result, "Locations", Locations, {
		"client:visible": true,
		"ceremony": eventData.locations.ceremony,
		"reception": eventData.locations.reception,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Locations.tsx",
		"client:component-export": "Locations"
	})}${renderComponent($$result, "Crew", Crew, {
		"client:visible": true,
		"members": eventData.crew,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Crew.tsx",
		"client:component-export": "Crew"
	})}${renderComponent($$result, "GiftRegistry", GiftRegistry, {
		"client:visible": true,
		"bankName": eventData.bankAccount.bankName,
		"iban": eventData.bankAccount.iban,
		"beneficiary": eventData.bankAccount.beneficiary,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/GiftRegistry.tsx",
		"client:component-export": "GiftRegistry"
	})}${renderComponent($$result, "Poll", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Poll.tsx",
		"client:component-export": "Poll"
	})}${renderComponent($$result, "Guestbook", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Guestbook.tsx",
		"client:component-export": "Guestbook"
	})}${renderComponent($$result, "Footer", Footer, {
		"client:visible": true,
		"groom": eventData.couple.groom,
		"bride": eventData.couple.bride,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/components/Footer.tsx",
		"client:component-export": "Footer"
	})}</main>` })}`;
}, "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/pages/index.astro", void 0);
var $$file = "C:/Users/Grigoris/Documents/GitHub/wedding-nikos/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
